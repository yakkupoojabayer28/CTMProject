using gm.app as capsrv from '../db/data-model';

service CatalogService {

    @readonly
    entity Custom_Parameter_Values                    as projection on capsrv.gm_custom_parameter_values;

    @readonly
    entity Company_Codes                              as projection on capsrv.gm_company_code;

    @readonly
    entity Purchasing_Document_Types                  as projection on capsrv.gm_purchasing_document_types;

    @readonly
    entity Field_Table                                as projection on capsrv.gm_field_table;

    @readonly
    entity Plants_Branches                            as projection on capsrv.gm_plants_branches;

    @readonly
    entity Vendor_Master                              as projection on capsrv.gm_vendor_master;

    @readonly
    entity UOM_Table                                  as projection on capsrv.gm_uom_table;

    @readonly
    entity County_Table                               as projection on capsrv.gm_county_table;

    @readonly
    entity Country_Table                              as projection on capsrv.gm_country_table;

    @readonly
    entity Taxes_Region_Key                           as projection on capsrv.gm_taxes_region_key;

    @readonly
    entity Elevator_Master                            as projection on capsrv.gm_elevator_master;

    @readonly
    entity City_Table                                 as projection on capsrv.gm_city_table;

    @readonly
    entity Postal_Codes_Table                         as projection on capsrv.gm_postal_codes_table;

    @readonly
    entity US_Seed_Contract_Table                     as projection on capsrv.gm_us_seed_contract_table;

    @redonly
    entity Purchasing_Document_Types_Table            as projection on capsrv.gm_purchasing_document_types_table;

    @readonly
    entity Season_Year_Table                          as projection on capsrv.gm_season_year_table;

    @readonly
    entity Growing_Location_Check_Table               as projection on capsrv.gm_growing_location_check_table;

    @readonly
    entity Material_Plant_and_Crop_Year_Table         as projection on capsrv.gm_material_plant_and_crop_year_table;

    @readonly
    entity General_Material_Data_Table                as projection on capsrv.gm_general_material_data_table;

    @readonly
    entity Variety_Premium_By_Region                  as projection on capsrv.gm_variety_premium_by_region;

    @readonly
    entity CLR_Rate_Table                             as projection on capsrv.gm_clr_rate_table;

    @readonly
    entity Plant_Specific_Lookup_Table                as projection on capsrv.gm_plant_specific_lookup_table;

    @readonly
    entity PAT0_Control_Table                         as projection on capsrv.gm_pat0_control_table;

    @readonly
    entity Parameters_For_Grower_Accounting_GuiXT     as projection on capsrv.gm_parameters_for_grower_accounting_guixt;

    @readonly
    entity EXCH_PRICE_Table                           as projection on capsrv.gm_exch_price_table;

    @readonly
    entity Agriculture_Elevator_Prices                as projection on capsrv.gm_agriculture_elevator_prices;

    @readonly
    entity Specie_Table                               as projection on capsrv.gm_specie_table;

    @readonly
    entity Pricing_Alternatives_Table                 as projection on capsrv.gm_pricing_alternatives_table;

    @readonly
    entity Foundation_Factor_Table                    as projection on capsrv.gm_foundation_factor_table;

    @readonly
    entity Growing_Location_by_Company_and_Year_Table as projection on capsrv.gm_growing_location_by_company_and_year_table;

    @readonly
    entity Production_Season_Master_Data_Table        as projection on capsrv.gm_production_season_master_data_table;

    @readonly
    entity Language_Key_Table                         as projection on capsrv.gm_language_key_table;

    @readonly
    entity Role_Table                                 as projection on capsrv.gm_role_table;

    @readonly
    entity EKKO_Extension_For_Grower_Accounting       as projection on capsrv.gm_EKKO_extension_for_grower_accounting;

    //unable to expose ekpo table

    @readonly
    entity Growers_Split_Data                         as projection on capsrv.gm_growers_split_data;

    @readonly
    entity Grower_Price_Table                         as projection on capsrv.gm_grower_price_table;

}
