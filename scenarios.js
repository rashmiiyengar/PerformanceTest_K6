import http from 'k6/http';
import {check} from 'k6';
import { sleep } from 'k6';
import exec from 'k6/execution'

export const options ={
    //threshold to set what is acceptable
    vus:10,
    duration:'10s',
    thresholds:{
       http_req_duration: ['p(95)<400'],
       http_req_duration:['max<2000'],
       http_req_failed:['rate<0.01'],
       //count tracks how many requests have been sent in total
       http_reqs:['count>20'],
       //we can also use 'rate' which checke how many requests sent per sec
       http_reqs:['rate>4'],
       //Minimum of 9 virtual users during the test
       //vus: ['value>9']
       checks:['rate>=0.98']
    }
}

export default function() {
    //const response=http.get('https://test.k6.io'+ (exec.scenario.iterationInTest===1?'foo':''))
    const response=http.get('https://test.k6.io')

    //console.log(exec.scenario.iterationInTest)
    check(response,{
        'status code is 200':(r)=> r.status === 200,
        'Page is home page':(r)=> r.body.includes('Collection of simple web-pages suitable for load testing')
    });
    sleep(2);

}