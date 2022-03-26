import {  
    Controller,
    Get,
    Param,
    HttpService} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService, private readonly httpService: HttpService) {}
    @Get(':dateUse')
    async getInfoDate(@Param('dateUse') dateUse: string): Promise<any> {
        var dateParts = dateUse.split("-");
        var date_traitement = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
        // le lien de la documentation pour connaitre l'id de Paris ne fonctionne pas 
        var date_chiffre_romain = this.postsService.recupererDateChiffreRomain(date_traitement);
        var london = 44418;
        var annee = dateParts[0];
        var mois = +dateParts[1] - 1;
        var jour = +dateParts[2];
        const response = await this.httpService.get(`https://www.metaweather.com/api/location/${london}/${annee}/${mois}/${jour}/`).toPromise();
        var max_temp = Math.max.apply(Math, response.data.map(function(o) { return o.max_temp; }))
        var min_temp = Math.min.apply(Math, response.data.map(function(o) { return o.min_temp; }))
        return dateUse + " " + date_chiffre_romain + " " + "Max temperature London : " + max_temp + " Mini temperature London : " + min_temp
    }
}
