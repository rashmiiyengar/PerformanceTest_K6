import http from 'k6/http';
import { sleep } from 'k6';

export const options ={
    thresholds:{
        //tags
       'http_req_duration{status:200}':['p(95)<1000']
    }
}

export default function() {
    http.get('https://run.mocky.io/v3/02ac50bb-139f-44c8-92ca-543b44c5804f')
    http.get('https://run.mocky.io/v3/37d58517-1d80-49f0-aba9-c808c819c7d5?mocky-delay=2000ms');
    sleep(2);
}