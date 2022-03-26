import {   
    Injectable,
    NotFoundException
    } from '@nestjs/common';
import { PostModel } from './posts.interface';

@Injectable()
export class PostsService {
    private romanize(num: number): string {
        var digits = String(+num).split(""),
            key    = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                    "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                    "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman  = "",
            i      = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }
    public recupererDateChiffreRomain(dateUse: Date): string {
        var currentTime  = dateUse;
        var strRomanDate = 
            this.romanize(currentTime.getDate()) + " . " +
            this.romanize(currentTime.getMonth() + 1) + " . " + 
            this.romanize(currentTime.getFullYear()); 

        return strRomanDate;
    }
}
