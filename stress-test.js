import http from 'k6/http';
import { sleep } from 'k6';

//Staging
//Designed to test,actual values may differ as per application
//to test application under above average condition
export const options={
    stages: [
        {
        duration:'10s',
        //target load
        target: 100  
        },
        {
        duration:'30s',
        target: 100  
        },
        {
        duration:'10s',
        target: 0    
        }
    ]
}

export default function(){
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contact.php');
    sleep(2)
    http.get('https://test.k6.io/news.php');
    sleep(2);
}