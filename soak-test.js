import http from 'k6/http';
import { sleep } from 'k6';

//Staging
//If an appln is placed i=under load for an extended period of time also known as edurance test
export const options={
    stages: [
        {
        duration:'5m',
        //target load
        target: 100  
        },
        {
        duration:'6h',
        target: 100  
        },
        {
        duration:'5m',
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