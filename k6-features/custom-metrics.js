import http from 'k6/http';
import { sleep } from 'k6';
import {Counter,Trend} from 'k6/metrics';

//Create custom metrics by importing supported type of metric by k6 like 
//"Trend","Rate","Counter"

export const options ={
    //threshold to set what is acceptable
    vus:10,
    duration:'10s',
    thresholds:{
       http_req_duration: ['p(95)<400'],
       my_Counter:['count>10'],
       response_time_newspage:['p(95)<120']
    }
}

let myCounter= new Counter('my_Counter')
let newsPageResponseTrend= new Trend('response_time_newspage')

export default function() {
    let res=http.get('https://test.k6.io')
    myCounter.add(1)

    sleep(1);

    res= http.get('https://test.k6.io/news.php')
    newsPageResponseTrend.add(res.timings.duration)
    console.log(restimings.duration)
    sleep(1);
}