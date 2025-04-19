import http from 'k6/http';
import { check } from 'k6';

export default function(){


   let res= http.get('https://test-api.k6.io/my/crocodiles/');

    

}