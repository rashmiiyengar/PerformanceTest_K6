import http from 'k6/http';
import { sleep } from 'k6';

//point at which the application breaks
export const options={
    stages: [
        {
        duration:'2h',
        //target load
        target: 10000
        }
    ]
}

export default function(){
    http.get('https://test.k6.io');
    sleep(1);
}