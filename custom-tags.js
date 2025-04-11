import http from 'k6/http';
import { check, sleep } from 'k6';
import {Counter} from 'k6/metrics';

export const options ={
   
    thresholds:{
       http_req_duration: ['p(95)<400'],
       'http_req_duration{page:order}':['p(95)<400'],
       http_errors:['count==0'],
       http_errors:['count==0'],
       checks:['rate>=0.99'],
       'checks{page:order}':['rate>=0.99']
    }
}

let httpErrors= new Counter('http_errors')

export default function() {
    let res=http.get('https://run.mocky.io/v3/02ac50bb-139f-44c8-92ca-543b44c5804f')
    if(res.error){
        httpErrors.add(1)
    }
    check(res,{'status is 200':(r)=>r.status===200}
    )
  
    //submit order
    res= http.get(
        'https://run.mocky.io/v3/37d58517-1d80-49f0-aba9-c808c819c7d5?mocky-delay=2000ms',
        {
            tags:{
                page:'order'
            }
        })
    
        if (res.error){
            httpErrors.add(1,{page:'order'})
        }

        check(res,(r)=>r.status===201,{page:'order'});

        sleep(1);
}