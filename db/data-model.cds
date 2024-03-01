namespace gm.app;

entity gm_custom_parameter_values {
    Client          : Integer;
    Business_Owner  : String(3);
    YYkey           : String(30);
    Field_Value     : String(40);
    Description     : String(70);
    Changed_by      : String(12);
    Changed_on      : Date;
    Last_Changed_at : Time

}

entity gm_company_code {
        Created_On                      : Date;
        Created_By                      : String(12);
        Changed_by                      : String(12);
        Changed_on                      : Date;
        Client                          : Integer;
    key Company_Code                    : Integer;
        Name_of_Company_Code_or_Company : String(25)
}

entity gm_purchasing_document_types {
        Created_On        : Date;
        Created_By        : String(12);
        Changed_by        : String(12);
        Changed_on        : Date;
        Client            : Integer;
    key Currency_Key      : String(5);
        ISO_currency_code : String(3)
}

entity gm_field_table {
        Created_On                           : Date;
        Created_By                           : String(12);
        Changed_by                           : String(12);
        Changed_on                           : Date;
        Client                               : Integer;
    key Plant                                : String(4);
    key Field_Number                         : Integer;
        Account_Number_of_Vendor_or_Creditor : String(10);
        Growing_Location                     : Integer;
        Est_Total_Field_Acres                : String(10);
        Field_Unit_of_Measure                : Integer;
        Irrigation_flag                      : String(1);
        County_Code                          : String(3);
        Township_Code                        : String(40);
        Township_Range_Code                  : String(3);
        Field_section                        : Integer;
        Field_Quarter                        : String(5);
        Common_Name                          : String(40);
        Region_State_Province_County         : String(3);
        Country_Key                          : String(3);
        Miles_from_the_Field_to_the_Plant    : Decimal(5);
        GPS_Coordinate_1                     : String(15);
        GPS_Coordinate_2                     : String(15);
        GPS_Coordinate_3                     : String(15);
        GPS_Coordinate_4                     : String(15);
        plant                                : Association to gm_plants_branches
                                                   on plant.Plant = $self.Plant;
        account_number_of_vendor_or_creditor : Association to gm_vendor_master
                                                   on account_number_of_vendor_or_creditor.Account_Number_of_Vendor_or_Creditor = $self.Account_Number_of_Vendor_or_Creditor;
        field_unit_of_measure                : Association to gm_uom_table
                                                   on field_unit_of_measure.Unit_of_Measurement = $self.Field_Unit_of_Measure;
        county_code                          : Association to gm_county_table
                                                   on county_code.County_Code = $self.County_Code;
        region_state_proveience_county       : Association to gm_taxes_region_key
                                                   on region_state_proveience_county.Region = $self.Region_State_Province_County;
        country_key                          : Association to gm_country_table
                                                   on country_key.Country_Key = $self.Country_Key;
}

entity gm_plants_branches {
        Created_On : Date;
        Created_By : String(12);
        Changed_by : String(12);
        Changed_on : Date;
        Client     : Integer;
    key Plant      : String(4);
        Name       : String(30)
}

entity gm_vendor_master {
        Created_On                           : Date;
        Created_By                           : String(12);
        Changed_by                           : String(12);
        Changed_on                           : Date;
        Client                               : Integer;
    key Account_Number_of_Vendor_or_Creditor : String(10)
}

entity gm_uom_table {
        Created_On          : Date;
        Created_By          : String(12);
        Changed_by          : String(12);
        Changed_on          : Date;
        Client              : Integer;
    key Language_Key        : String;
    key Unit_of_Measurement : String; //this was not key

}

entity gm_county_table {
        Created_On  : Date;
        Created_By  : String(12);
        Changed_by  : String(12);
        Changed_on  : Date;
        Client      : Integer;
        Country_Key : String(3);
    key Region      : String(3); //this was not a key
        County_Code : Integer
}

entity gm_country_table {
        Created_On  : Date;
        Created_By  : String(12);
        Changed_by  : String(12);
        Changed_on  : Date;
        Client      : Integer;
    key Country_Key : String(3);

}

entity gm_taxes_region_key {
        Created_On  : Date;
        Created_By  : String(12);
        Changed_by  : String(12);
        Changed_on  : Date;
        Client      : Integer;
    key Country_Key : String(3);
    key Region      : String(3);
}

entity gm_elevator_master {
        Created_On                     : Date;
        Created_By                     : String(12);
        Changed_by                     : String(12);
        Changed_on                     : Date;
        Client                         : Integer;
    key Elevator_Code                  : Integer;
        Plant                          : String(4);
        Name                           : String(30);
        Elevator_Address               : String(30);
        City                           : String(25);
        Region                         : String(3);
        Postal_Code                    : String(10);
        First_telephone_number         : String(16);
        Elevator_Contact               : String(30);
        Active_Record_Flag             : String(1);
        Country_Key                    : String(3);
        Agriculture_Commodity_Exchange : String(4);
        plant                          : Association to gm_plants_branches
                                             on plant.Plant = $self.Plant;
        city                           : Association to gm_city_table
                                             on city.City_Code = $self.City;
        Region_State_Province_County   : Association to gm_taxes_region_key
                                             on Region_State_Province_County.Region = $self.Region;
        postal_code                    : Association to gm_postal_codes_table
                                             on postal_code.Postal_code = $self.Postal_Code;
        country_Key                    : Association to gm_country_table
                                             on country_Key.Country_Key = $self.Country_Key;


}

entity gm_city_table {
        Created_On  : Date;
        Created_By  : String(12);
        Changed_by  : String(12);
        Changed_on  : Date;
        Client      : Integer;
    key Country_Key : String(3);
    key Region      : String(3);
    key City_Code   : String(4);

}

entity gm_postal_codes_table {
        Created_On  : Date;
        Created_By  : String(12);
        Changed_by  : String(12);
        Changed_on  : Date;
    key Postal_code : String(10);
        City        : String(30);
}

entity gm_us_seed_contract_table {
        Created_On                                                   : Date;
        Created_By                                                   : String(12);
        Changed_by                                                   : String(12);
        Changed_on                                                   : Date;
        Client                                                       : Integer;
    key Company_Code                                                 : Integer;
    key Season_Year                                                  : Integer;
    key Purchasing_Document_Type                                     : String(4);
        Specie                                                       : String(2);
        CCE_Bushel_Area_Base_Yield                                   : Decimal(5);
        Estimated_Price                                              : Integer;
        Currency_Key                                                 : Integer;
        Complex_Seed_Stock_Pricing                                   : String(1);
        BU_deduction_factor                                          : Decimal(4);
        GYI_Variable_Bushels                                         : Integer;
        GYI_Max_Premium_Increase                                     : Integer;
        Hauling_Info_Relevant                                        : String(1);
        GYI_Premium_Maximum                                          : Integer;
        GYI_Premium_Minimum                                          : Integer;
        GYI_Min_Premium_Increase                                     : Integer;
        GYI_Minimum                                                  : Integer;
        GYI_Minimum_for_Single_Field_Contract                        : Integer;
        GYI_Maximum                                                  : Integer;
        Factor_Flag                                                  : String(1);
        Guaranteed_Yield_Acre                                        : String(1);
        MPCI                                                         : String(1);
        Moisture_Deduction_Factor                                    : Decimal(5);
        Priced_By_Percent                                            : String(1);
        Price_Basis_Range                                            : Decimal(6);
        Price_Method                                                 : String(3);
        Grower_Charged_for_Seed_Stock                                : String(1);
        Standard_Moisture                                            : Decimal(5);
        Contract_Designation                                         : String(1);
        Usage_Percentage                                             : Decimal(5);
        CCE_Calc                                                     : String(1);
        CCE_Bushel_Grower_Index_Factor                               : Decimal(5);
        County_Loan_Rate_Eligible                                    : String(1);
        Production_Order_Type                                        : String(4);
        Account_assignment_category                                  : String(1);
        Hedging_Relevant                                             : String(1);
        Pay_limit                                                    : Decimal(5);
        Single_Field_Contract_Type                                   : String(4);
        Indicates_the_contract_type_will_pay_based_on_HarvestBushels : String(1);
        Flag_indicating_the_contract_type_is_valid_for_LDP_pricing   : String(1);
        CCE_for_Rotated_Acre_Increase                                : Decimal(3);
        Premium_Name                                                 : String(10);
        Overall_Limit_Multiplier                                     : Integer;
        Auto_Pay_date                                                : Date;
        Default_Acres_Switch                                         : String(1);
        Percent_Target                                               : Decimal(5);
        Initial_Payment_Percentage_for_WashingtonFoundation_Contract : Decimal(5);
        Percentage_for_Isolated_discard_acres_Washington_fnd_cntrt   : Decimal(5);
        Actual_CCE_Bushels_Acre                                      : Decimal(3);
        Tolerance_limit_on_payment_per_acre                          : Decimal(7);
        Isolation_Bushels                                            : Integer;
        Check_to_Create_DS_Order                                     : String(1);
        Percent_of_LCCE_for_Discard_Acres                            : Decimal(5);
        Precommercial_Utilization_Increasing_Factor                  : Decimal(10);
        Rotational_Area_Greater_than_Actual_Area                     : String(1);
        company_Code                                                 : Association to gm_company_code
                                                                           on company_Code.Company_Code = $self.Company_Code;
        season_Year                                                  : Association to gm_season_year_table
                                                                           on season_Year.Season_Year = $self.Season_Year;
        purchasing_Document_Type                                     : Association to gm_purchasing_document_types_table
                                                                           on purchasing_Document_Type.Purchasing_Document_Type = $self.Purchasing_Document_Type;
        specie                                                       : Association to gm_specie_table
                                                                           on specie.Specie = $self.Specie;
        purchasing_Document_Category                                 : Association to gm_purchasing_document_types_table
                                                                           on purchasing_Document_Category.Purchasing_Document_Category = $self.Purchasing_Document_Type;


}

entity gm_purchasing_document_types_table {
        Created_On                   : Date;
        Created_By                   : String(12);
        Changed_by                   : String(12);
        Changed_on                   : Date;
        Client                       : Integer;
    key Purchasing_Document_Category : String(1);
    key Purchasing_Document_Type     : String(4);
}

entity gm_season_year_table {
        Created_On                                : Date;
        Created_By                                : String(12);
        Changed_by                                : String(12);
        Changed_on                                : Date;
        Client                                    : Integer;
    key Specie                                    : String(2);
    key Start_Date                                : Date;
    key End_Date                                  : Date;
        Season_Year                               : Integer;
        First_Date_the_grower_can_price_contracts : Date;
        Last_Date_the_user_can_price_contracts    : Date;
        Farmsource_End_date                       : Date;
        specie                                    : Association to gm_specie_table
                                                        on specie.Specie = $self.Specie;


}

entity gm_growing_location_check_table {
        Created_On                  : Date;
        Created_By                  : String(12);
        Changed_by                  : String(12);
        Changed_on                  : Date;
        Client                      : Integer;
    key Plant                       : String(4);
    key Grow_Location               : Integer;
    key Growing_Location_Name       : String(30);
        Geographical_Area_Direction : String(1);
        Environment_code            : String(5);
        plant                       : Association to gm_plants_branches
                                          on plant.Plant = $self.Plant;


}

entity gm_material_plant_and_crop_year_table {
        Created_On                  : Date;
        Created_By                  : String(12);
        Changed_by                  : String(12);
        Changed_on                  : Date;
        Client                      : Integer;
    key Company_Code                : Integer; // this not key
    key Season_Year                 : Integer; //this is not key
        Production_Season_ID        : String(2);
        Plant                       : String(4);
        Grow_Location               : Integer;
        Material_Number             : String(18);
        Estimated_Yield_Target      : Integer;
        UOM_for_Yield_Fields        : Integer;
        Estimated_Yield_FNG         : Decimal(6);
        Percent_of_Target           : Integer;
        Clean_Out_Percent           : Decimal(5);
        Sorghum_Factor              : Decimal(7);
        Warm_Germ_Target_Percent    : Integer;
        Cold_Germ_Target_Percent    : Integer;
        Seed_Stock_Tech_Fee         : Integer;
        Bin_Rank_Flag               : String(1);
        Seed_Stock_Standard_Price   : Integer;
        Seed_Stock_Option_Price     : Integer;
        Seed_Stock_Foundation_Price : Integer;
        Currency_Key                : Integer;
        Screen_Size_for_Sorghum     : Decimal;
        Variety_Premium             : Integer;
        Planting_Instructions       : String(20);
        Payment_Factor              : Decimal(4);
        Planned_Dry_Shell           : Integer;
        company_Code                : Association to gm_company_code
                                          on company_Code.Company_Code = $self.Company_Code;
        season_Year                 : Association to gm_season_year_table
                                          on season_Year.Season_Year = $self.Season_Year;
        plant                       : Association to gm_plants_branches
                                          on plant.Plant = $self.Plant;
        grow_Location               : Association to gm_growing_location_check_table
                                          on grow_Location.Grow_Location = $self.Grow_Location;
        material_Number             : Association to gm_general_material_data_table
                                          on material_Number.Material_Number = $self.Material_Number;
        unit_of_Measurement         : Association to gm_uom_table
                                          on unit_of_Measurement.Unit_of_Measurement = $self.UOM_for_Yield_Fields;
        currency_Key                : Association to gm_purchasing_document_types
                                          on currency_Key.Currency_Key = $self.Currency_Key;

}

entity gm_general_material_data_table {
        Created_On      : Date;
        Created_By      : String(12);
        Changed_by      : String(12);
        Changed_on      : Date;
        Client          : Integer;
    key Material_Number : String(18)

}

entity gm_variety_premium_by_region {
        Created_On               : Date;
        Created_By               : String(12);
        Changed_by               : String(12);
        Changed_on               : Date;
        Client                   : Integer;
    key Company_Code             : Integer;
    key Season_Year              : Integer;
    key Purchasing_Document_Type : String(4);
    key Material_Number          : String(18);
        Variety_Premium          : Integer;
        BUYOUT_FEE               : Integer;
        company_Code             : Association to gm_company_code
                                       on company_Code.Company_Code = $self.Company_Code;
        season_Year              : Association to gm_season_year_table
                                       on season_Year.Season_Year = $self.Season_Year;
        purchasing_Document_Type : Association to gm_purchasing_document_types_table
                                       on purchasing_Document_Type.Purchasing_Document_Type = $self.Purchasing_Document_Type;
        material_Number          : Association to gm_general_material_data_table
                                       on material_Number.Material_Number = $self.Material_Number;
}

entity gm_clr_rate_table {
        Created_On                    : Date;
        Created_By                    : String(12);
        Changed_by                    : String(12);
        Changed_on                    : Date;
        Client                        : Integer;
    key Season_Year                   : Integer;
    key Specie                        : String(2);
    key Country_Key                   : String(3);
    key Region                        : String(3);
    key County_Code                   : String(3);
    key Activity_Number               : String(18);
    key County_Loan_Rate_MPCI_Percent : Decimal(8);
    key Currency_Key                  : Integer;
        season_Year                   : Association to gm_season_year_table
                                            on season_Year.Season_Year = $self.Season_Year;
        specie                        : Association to gm_specie_table
                                            on specie.Specie = $self.Specie;
        country_Key                   : Association to gm_country_table
                                            on country_Key.Country_Key = $self.Country_Key;
        region                        : Association to gm_taxes_region_key
                                            on region.Region = $self.Region;
        county_Code                   : Association to gm_county_table
                                            on county_Code.County_Code = $self.County_Code;
        currency_Key                  : Association to gm_purchasing_document_types
                                            on currency_Key.Currency_Key = $self.Currency_Key;


}

entity gm_plant_specific_lookup_table {
        Created_On                  : Date;
        Created_By                  : String(12);
        Changed_by                  : String(12);
        Changed_on                  : Date;
        Client                      : Integer;
    key Plant                       : String(4);
        Purchasing_Group            : String(3);
        Purchasing_Organization     : String(4);
        Order_Type                  : String(4);
        Tax_on_sales_purchases_code : String(2);
        Incoterms                   : String(3);
        Spool_default_printer       : String(10);
        Plant_Type                  : String(1);
        Plant_Growing_Status        : String(1);
        Plant_Mthr                  : String(4);
        Common_Plant_Name           : String(30);
        Plant_Manager_Name          : String(30);
        Load_Ticke_RFID_Layout      : String(1);
        Spool_RFI_printer           : String(4);

}

entity gm_pat0_control_table {
        Created_On                  : Date;
        Created_By                  : String(12);
        Changed_by                  : String(12);
        Changed_on                  : Date;
        Client                      : Integer;
    key Country_Key                 : String(3);
    key Plant                       : String(4);
    key Specie                      : String(2);
    key Parental_Flag               : String(1);
        Order_Type                  : String(4);
        Account_assignment_category : String(3);
        General_settlement_receiver : String(35);
        country_Key                 : Association to gm_country_table
                                          on country_Key.Country_Key = $self.Country_Key;
        plant                       : Association to gm_plants_branches
                                          on plant.Plant = $self.Plant;
        specie                      : Association to gm_specie_table
                                          on specie.Specie = $self.Specie;
        order_Type                  : Association to gm_purchasing_document_types_table
                                          on order_Type.Purchasing_Document_Category = $self.Order_Type;

}

entity gm_parameters_for_grower_accounting_guixt {
        Created_On                                         : Date;
        Created_By                                         : String(12);
        Changed_by                                         : String(12);
        Changed_on                                         : Date;
        Client                                             : Integer;
    key Plant                                              : String(4);
    key Order_Type                                         : String(4);
        Specie_code_used_in_GuiXT_scripts                  : String(4);
        Company_Code                                       : Integer;
        Purchasing_Organization                            : String(4);
        Purchasing_Group                                   : String(3);
        Tax_on_sales_purchases_code                        : String(2);
        Incoterms                                          : String(3);
        Confirmation_Control_Key                           : String(4);
        Contract_Unit_of_Measure                           : Integer;
        Contract_Area_UOM_Text                             : String(10);
        UOM_for_Yield_Fields                               : Integer;
        Estimated_Yield_UOM_Text                           : String(10);
        Tracking_Number_Switch                             : String(1);
        Spool_Output_device                                : String(4);
        Mother_Plant                                       : String(4);
        Indicate_when_to_bypass_the_target_qty_calculation : String(1);
        Bypass_Grower_Splits_screen                        : String(1);
        Indicator_for_displaying_Season_ID                 : String(1);
        Indicator_for_displaying_Get_Batch                 : String(1);
        Tax_Code_to_use_when_vendor_has_VAT                : String(2);

}

entity gm_exch_price_table {
        Created_On                     : Date;
        Created_By                     : String(12);
        Changed_by                     : String(12);
        Changed_on                     : Date;
        Client                         : Integer;
    key Agriculture_Commodity_Exchange : String(4);
    key Specie                         : String(2);
    key Market_Date                    : Date;
    key Price_Month                    : String(2);
    key Price_Year                     : Integer;
        Market_Close_Price             : Decimal(10);
        Market_High_Price              : Decimal(10);
        Currency_Key                   : Integer;
        Create_Dates                   : Date;
        Creation_Time                  : Time;
        agriculture_Commodity_Exchange : Association to gm_elevator_master
                                             on agriculture_Commodity_Exchange.Agriculture_Commodity_Exchange = $self.Agriculture_Commodity_Exchange;
        specie                         : Association to gm_specie_table
                                             on specie.Specie = $self.Specie;
        currency_Key                   : Association to gm_purchasing_document_types
                                             on currency_Key.Currency_Key = $self.Currency_Key;

}

entity gm_agriculture_elevator_prices {
        Created_On                     : Date;
        Created_By                     : String(12);
        Changed_by                     : String(12);
        Changed_on                     : Date;
        Client                         : Integer;
    key Agriculture_Commodity_Exchange : String(4);
    key Specie                         : String(2);
    key Elevator_Code                  : Integer;
    key Elevator_Price_Type            : String(2);
    key Price_Month                    : String(2);
    key Price_Year                     : Integer;
    key Start_Date                     : Date;
    key Create_Dates                   : Date;
    key Creation_Time                  : Time;
        End_Date                       : Date;
        Price                          : Decimal(8);
        Currency_Key                   : Integer;
        agriculture_Commodity_Exchange : Association to gm_elevator_master
                                             on agriculture_Commodity_Exchange.Agriculture_Commodity_Exchange = $self.Agriculture_Commodity_Exchange;
        specie                         : Association to gm_specie_table
                                             on specie.Specie = $self.Specie;
        elevator_Code                  : Association to gm_elevator_master
                                             on elevator_Code.Elevator_Code = $self.Elevator_Code;
        currency_Key                   : Association to gm_purchasing_document_types
                                             on currency_Key.Currency_Key = $self.Currency_Key;

}

entity gm_specie_table {
        Created_On         : Date;
        Created_By         : String(12);
        Changed_by         : String(12);
        Changed_on         : Date;
        Client             : Integer;
    key Specie             : String(2);
        Specie_Description : String(35);
}

entity gm_pricing_alternatives_table {
        Created_On           : Date;
        Created_By           : String(12);
        Changed_by           : String(12);
        Changed_on           : Date;
        Client               : Integer;
    key Season_Year          : Integer;
        Season_ID            : String(2); //this was a key and removed coz empty
    key Company_Code         : Integer;
    key Specie               : String(2);
    key Price_Month          : String(2);
    key Price_Year           : Integer;
    key From_Market_Date     : Date;
    key To_Market_Date       : Date;
        Requested_Check_Date : Date;
        Cash_Terms           : Decimal(2);
        Basis_Threshold      : Decimal(2);
        Country_Key          : String(3);
        Auto_price_Indicator : String(1);
        Futures_Month        : String(2);

}

entity gm_foundation_factor_table {
        Created_On               : Date;
        Created_By               : String(12);
        Changed_by               : String(12);
        Changed_on               : Date;
        Client                   : Integer;
    key Company_Code             : Integer;
    key Season_Year              : Integer;
    key Purchasing_Document_Type : String(4);
    key Plant                    : String(4);
    key Acres_Range_Low          : Decimal(11);
        Acres_Range_High         : Decimal(11);
        Foundation_Factor        : Decimal(4);
        Foundation_Rate          : Integer;
        Currency_Key             : Integer

}

entity gm_growing_location_by_company_and_year_table {
        Created_On                              : Date;
        Created_By                              : String(12);
        Changed_by                              : String(12);
        Changed_on                              : Date;
        Client                                  : Integer;
    key Company_Code                            : Integer;
    key Crop_Year                               : Integer;
    key Plant                                   : String(4);
    key Grow_Location                           : Integer;
    key Production_Season_ID                    : String(2);
        Irrigation_flag                         : String(1);
        Area_Base_Yield_Designated_Flag         : String(1);
        GYI_Ranking_Group                       : Integer;
        Sign_Off                                : String(1);
        Estimated_CCE_Bushels_Acre              : Decimal(3);
        Actual_CCE_Bushels_Acre                 : Decimal(2);
        Male_Compensation_for_Grower_Accounting : Decimal(6);
        Cost_Center                             : String(10);
        Grain_Discount                          : Decimal(3);
        Good_Planting_Window                    : Date;
        Best_Planting_Window                    : Date;
        Intermediate_Planting_Window            : Date;
        company_Code                            : Association to gm_company_code
                                                      on company_Code.Company_Code = $self.Company_Code;
        plant                                   : Association to gm_plants_branches
                                                      on plant.Plant = $self.Plant;
        grow_Location                           : Association to gm_growing_location_check_table
                                                      on grow_Location.Grow_Location = $self.Grow_Location;
        production_Season_ID                    : Association to gm_production_season_master_data_table
                                                      on production_Season_ID.Production_Season_ID = $self.Production_Season_ID;


}

entity gm_production_season_master_data_table {
        Created_On                    : Date;
        Created_By                    : String(12);
        Changed_by                    : String(12);
        Changed_on                    : Date;
        Client                        : Integer;
    key Language_Key                  : Integer; //this is not key
    key Production_Season_ID          : String(2); //this is not key
        Production_Season_Description : String(35);
        language_Key                  : Association to gm_production_season_master_data_table
                                            on language_Key.Language_Key = $self.Language_Key;

}

entity gm_language_key_table {
        Created_On              : Date;
        Created_By              : String(12);
        Changed_by              : String(12);
        Changed_on              : Date;
    key Language_Key            : String(2); //this was interger initially
        Language_specifications : String(1);

}

entity gm_role_table {
        Created_On       : Date;
        Created_By       : String(12);
        Changed_by       : String(12);
        Changed_on       : Date;
    key Role             : String(1);
        Role_Description : String(20);
}

entity gm_EKKO_extension_for_grower_accounting {
        Created_On                              : Date;
        Created_By                              : String(12);
        Changed_by                              : String(12);
        Changed_on                              : Date;
        Client                                  : Integer;
    key Purchasing_Document_Number              : String(10);
        Growing_Production_Location_Number      : Integer;
        Growing_Village_Number                  : Integer;
        Location_Coordinator_Vendor_Number      : String(10);
        Production_Executive_for_Village        : Integer;
        Grow_Location                           : Integer;
        Specie                                  : String(2);
        Field_Number                            : Integer;
        Elevator_Code                           : Integer;
        Contract_Area                           : String(10); // here data typr is QUAN
        Estimated_Yield_Target                  : String(6); // here data typr is QUAN
        UOM_for_Yield_Fields                    : Integer;
        Usage_Dom_Int_Both                      : String(1);
        CCE_Inc_Fixed                           : Decimal(5);
        CCE_Inc_Percent                         : Decimal(5);
        Single_Field                            : String(1);
        CLR                                     : String(1);
        Field_Certified                         : String(1);
        Final_Planting                          : String(1);
        Flat_Price                              : Integer;
        Yield_Index_Premium                     : String(1);
        Measured_Final_Area                     : String(1);
        Contract_Unit_of_Measure                : Integer; // Here data type is UNIT
        Gender_male_or_Fimale                   : String(1);
        Male_Ratio_Percentage                   : Decimal(6);
        Female_Ratio_Percentage                 : Decimal(6);
        Hybrid                                  : String(3);
        Material_Number                         : String(18);
        Field_Technician                        : Integer;
        Irrigation_flag                         : String(1);
        Employee_who_can_authorize_the_contract : Integer;
        Growers_age                             : Integer;
        Grower_Index                            : Decimal(5);
        Base_Price_Rate                         : Integer; // here data type is CURR
        Final_Premium_Price                     : Integer; // here data type is CURR
        Currency_Key                            : String(5); // here data type is CUKY
        Revised_Increase_Factor                 : Decimal(4);
        Final_CCE_Bushels                       : String(10); // here data type is QUAN
        Final_Payment_Ind                       : String(1);
        Contract_Final_Flag                     : String(1);
        Product_State                           : String(2);
        Release_to_Web_Indicator                : String(1);
        Planned_order_number                    : String(10);
        Germination                             : Decimal(5);
        Genetic_Purity                          : Decimal(5);
        Physical_Purity                         : Decimal(5);
        Minimum_Moisture                        : Decimal(5);
        Maximum_Moisture                        : Decimal(5);
        Payment_Moisture                        : Decimal(5);
        Calculated_Moisture                     : Decimal(5);
        Price_Type                              : String(1);
        Payment_Indicator                       : String(1);
        Production_Area                         : String(10);
        Contract_Version                        : String(2);
        Crop_Payment_in_days_after_Harvest      : Integer;
        Crop_Payment_no_earlier_than_days       : Integer;
        Crop_Advance_Payment_in_days            : Integer;
        Surface_Area_Rate                       : Integer; // here data type is CURR
        Cage_Rate                               : Integer; // here data type is CURR
        KG_Rate                                 : Integer; // here data type is CURR
        Cull_Rate                               : Integer; // here data type is CURR
        Quality                                 : String(1);
        Delivery_Location                       : String(12);
        Irrigation_Type                         : String(1);
        Harvest_Advance_Percentage              : Integer;
        Stockseed_payment_indicator             : String(1);
        Standard_Contract_Number                : String(10);
        Variable_Yield_Rate                     : Decimal(11);
        Variable_Yield_Rate_UOM                 : Integer; // here data type is UNIT
        Calculated_Variable_Yield_Rate_per_Area : Decimal(11);
        Calculated_Area                         : String(8);
        Number_of_Cages                         : Integer;
        Surface_Area_UOM                        : Integer; // here data type is UNIT
        Integrated_Price                        : Integer; // here data type is CURR
        Fixd_Equiv_Cost_KPS                     : Integer; // here data type is CURR
        Var_Equiv_Cost_KPS                      : Integer; // here data type is CURR
        Totl_Equiv_Cost_KPS                     : Integer; // here data type is CURR
        Twenty_Inch_row_Increase_bushel         : String(1);
        Herbicide_Premium                       : Integer; // here data type is CURR
        Isolation_Standard                      : String(30);
        Main_contract_printing_indicator        : String(1);
        Release_Mill_Buyout                     : String(1);
        Total_Estimated_Female_Acres            : Integer; // here data type is QUAN
        Entire_Crop_Rate                        : Integer;
        Payment_Factor                          : Decimal(4);
        Contract_Payment_Type                   : String(3);
        Phase                                   : String(2);
        Acronym_Name                            : String(30);
        Season                                  : String(10);
        Technology                              : String(10);
        //Price_Type                              : String(10); // here Price type repeat 2 time
        Fixed_Guarentee                         : Integer; // here data type is QUAN
        Normal_Guarentee                        : Integer; // here data type is QUAN
        //CCE_Inc_Percent                         : Decimal(5);
        Guarantee_Amount_Unit_of_Measure        : Integer;
        Detasseling_Indicator                   : String(1);
        Sowing_Indicator                        : String(1);
        Payment_Text                            : String(50);
        Advance                                 : Decimal(11);
        Number_of_Corner_Bags                   : Decimal(7);
        Pay_Specie                              : String(2);
        Liters_of_gas_oil                       : Decimal(6);
        Fixed_Price_Rent                        : String(1);
        Fixed_Price_Irrigation                  : String(1);
        Canada_Seed_Grower_Association_Number   : Integer;
        Tech_Stewardship_Number                 : String(10);
        MTC_Table_Number                        : Integer;
        Registration_Number                     : String(30);
        AOA_Equivalent_Price                    : Integer; // here data type is CURR
        GOA_Equivalent_Price                    : Integer; // here data type is CURR
        Price_Month                             : String(2);
        Saved_Value                             : Integer; // here data type is CURR
        Currency                                : Integer; // here data type is CUKY
        Production_Level                        : String(4);
        Delivered_Seed_Condition                : String(1);
        Variety_Average_Yield                   : Decimal(1);
        Year_of_multi_year_contract             : Integer;

}

entity ZBYCS_S2P_C_EKPO {
        Created_On                            : Date;
        Created_By                            : String(12);
        Changed_by                            : String(12);
        Changed_on                            : Date;
        Client                                : Integer;
    key Purchasing_Document_Number            : String(10);
    key Item_Number_of_Purchasing_Document    : Integer;
        Growing_Field                         : String(10);
        Payment_Flag_Determining_Price        : String(2);
        Actual_Female_Sterile_Acres           : Integer; // here data type is CURR
        Actual_Female_Fertile_Acres           : Integer; // here data type is CURR
        Actual_Male_Acres                     : Integer; // here data type is CURR
        Actual_Male_Barrier_Acres             : Integer; // here data type is CURR
        Actual_No_Plant_Acres                 : Integer; // here data type is CURR
        Field_Address                         : String(100);
        Cytoplasm                             : String(1);
        Field_Area                            : Integer; // here data type is QUAN
        Field_Area_Unit_of_Measure            : Integer; // here data type is UNIT
        Planting_Trips                        : Decimal(4);
        Re_planting_Trips                     : Decimal(4);
        Re_Plant_Acres                        : Integer; // here data type is QUAN
        Date_field_was_plantted               : Date;
        Area_Discard_Fertile_Nonpay           : Integer; // here data type is QUAN
        Area_Discard_Fertile_Pay              : Integer; // here data type is QUAN
        Area_Discard_Sterile_Nonpay           : Integer; // here data type isQUAN
        Area_Discard_Sterile_Pay              : Integer; // here data type isQUAN
        Area_Discard_Male_Nonpay              : Integer; // here data type isQUAN
        Area_Discard_Male_Pay                 : Integer; // here data type isQUAN
        Area_Discard_Isolation_Female_Fertile : Integer; // here data type isQUAN
        Area_Discard_Isolation_Female_Sterile : Integer; // here data type isQUAN
        Area_Discard_Isolation_Male           : Integer; // here data type isQUAN
        Release_Estimated_Yield_SSU           : Integer; // here data type isQUAN
        UOM_for_Yield_Fields                  : Integer; // here data type is UNIT
        Contract_Unit_of_Measure              : Integer; // here data type is UNIT
        Rotation_Area                         : Integer; // here data type is QUIN
        Release_Finished_Goods_Yield          : Decimal(5);
        Out_of_Supply                         : String(1);
        Grower_Name                           : String(30);
        Invoice_Credit_Memo_due_in_days       : Decimal(3);
        Previous_Crop_Year1                   : String(4);
        Previous_Crop1                        : String(4);
        Previous_Crop_Year2                   : String(4);
        Previous_Crop2                        : String(4);
        Previous_Crop_Year3                   : String(4);
        Previous_Crop3                        : String(4);
        Germination_Percentage                : Decimal(5);
        County_or_Municipality                : String(30);
        Acres_Sprayed                         : Integer; // here data type is QUIN
        Spray_Rate_$_Acre                     : Integer; // here data type is CURR
        Harvest_Date                          : Date;
        Advance_Payment_Text                  : String(25);
        Payment_Due_Date                      : Date;
        Actual_Isolation_Acres                : Integer; // here data type is QUIN
        Abandoned_Area                        : Integer; // here data type is QUIN
        Authorized_Area                       : Integer; // here data type is QUIN
        Weather_Area                          : Integer; // here data type is QUIN
        Machinery_Expense_MX                  : Decimal(8);
        Planting_Expense_MX                   : Decimal(8);
        Clean_Out_Percent                     : Decimal(5);
        Grower_Contract_Number                : String(20);
        Safety_Machinery                      : Decimal(14);
        Compensation_in_KGs                   : Integer; // here data type is QUIN
        Advance_to_deduct                     : Integer; // here data type is QUIN
        Advance_UOM                           : Integer; // here data type is UNIT
        Corner_bags_to_deduct                 : Integer; // here data type is QUIN
        KGs_calculated                        : Integer; // here data type is QUIN
        Miscellaneous                         : Integer; // here data type is QUIN
        Defol_Indicator                       : String(1);
        Hectares_by_Male_Compensation         : Decimal(8);
        Guarantee_Yield                       : Integer; // here data type is QUIN
        Guarantee_Amount_Unit_of_Measure      : Integer; // here data type is UNIT
        Guarantee_Area_Unit_of_Measure        : Integer; // here data type is UNIT
        Bagging_Planned_Order                 : String(10);
        Final_Planting                        : String(1);
        Measured_Final_Area                   : String(1);
        Final_Payment_Ind                     : String(1);
        Assistance_Amount                     : String(15);
        RHS_Sprayed                           : String(1);

}

entity gm_growers_split_data {
        Created_On                             : Date;
        Created_By                             : String(12);
        Changed_by                             : String(12);
        Changed_on                             : Date;
        Client                                 : Integer;
    key Purchasing_Document_Number             : String(10);
    key Activity_Number                        : String(18);
    key Account_Number_of_Vendor_or_Creditor   : String(10);
        Vendors_Role_for_the_contract_activity : String(1);
        Percent_Incurred                       : Decimal(7);
        Power_of_Attorney                      : String(10);
        Planting_Payment_Flag                  : String(1)

}

entity gm_grower_price_table {
        Client                                               : Integer;
        Created_On                                           : Date;
        Created_By                                           : String(12);
        Changed_by                                           : String(12);
        Changed_on                                           : Date;
    key Purchasing_Document_Number                           : String(10);
    key Account_Number_of_Vendor_or_Creditor                 : String(10);
    key Counter                                              : Integer;
    key Create_Dates                                         : Date;
    key Creation_Time                                        : Time;
        Market_Date                                          : Date;
        Percent_Priced                                       : Decimal(3);
        Market_Price                                         : Decimal(10);
        Price_Basis                                          : Decimal(6);
        Price_Month                                          : String(2);
        Price_Year                                           : Integer;
        Requested_Check_Date                                 : Date;
        Confirmation_Number                                  : String(26);
        Target_Price                                         : Decimal(8);
        Target_Confirmation_Number                           : String(20);
        County_Loan_Rate_MPCI_Percent                        : Decimal(8);
        Payment_Complete                                     : String(1);
        Sort_Counter                                         : Integer;
        Delete_Indicator                                     : String(1);
        Deleted_By_user                                      : String(12);
        Date_Deleted                                         : Date;
        Decimal_number_of_11_in_length_with_4_decimal_places : Decimal(15);
        UOM_for_Yield_Fields                                 : Integer;
        Advance                                              : String(1);
        Elevator_Code                                        : Integer;
        Payment_Complete2                                    : String(1);
        Batch_Number                                         : String(10);
        Ton_Price                                            : Decimal(8);
        Hectare_Price                                        : Decimal(8);
        Agriculture_Commodity_Exchange                       : String(4);


}
