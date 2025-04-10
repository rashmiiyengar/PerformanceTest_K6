import http from 'k6/http';
import { sleep } from 'k6';

//Staging
//Designed to test,actual values may differ as per application
//Sudden increase or decrease in load
//ex: a new product was launched and that product created a lot of traffic sudden spike
export const options={
    stages: [
        {
        duration:'2m',
        //target load
        target: 1000  
        },
        {
        duration:'1m',
        target: 0    
        }
    ]
}

export default function(){
    http.get('https://test.k6.io');
    sleep(1);
}