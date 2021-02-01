import { ServiceUrls } from "../../constants/ServiceUrls";
import { Console } from "../../utils/ConsoleLog";
import { APIHelper } from "../APIHelper";
import { GetTMDBConfigResponseDTD } from "./dtd/TMDB-dtd";


export class TMDBService {

    private constructor() { }


    static async fetchConfig(): Promise<GetTMDBConfigResponseDTD> {
        try {
            const res = await APIHelper.api.get<GetTMDBConfigResponseDTD>(ServiceUrls.API_TMDB_GET_CONFIG);

            if (res.data) {
                return res.data;
            }
            
        } catch (e) {
            Console.error(e);
        }

        return null;
    }



}