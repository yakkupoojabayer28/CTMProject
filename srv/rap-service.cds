using {ZBYGL_S2P_C_SB_CONTRACT as rap} from './external/ZBYGL_S2P_C_SB_CONTRACT.csn';

service RapService {

    @readonly
    entity YYMPU_C_EKKO       as projection on rap.YYMPU_C_EKKO

    entity YYMPU_GM_Vendor_f4 as projection on rap.YYMPU_GM_Vendor_f4
}
