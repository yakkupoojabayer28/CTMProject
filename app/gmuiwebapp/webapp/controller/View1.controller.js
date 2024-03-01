sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "gmuiwebapp/model/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Formatter) {
        "use strict";

        return Controller.extend("gmuiwebapp.controller.View1", {
            Formatter: Formatter,
            onInit: function () {
                this.initializeAction();
            },
            //function for loading fragment dynamically
            onValueHelpClick: function (oEvent) {

                var fragName = "gmuiwebapp.Fragment."
                if (oEvent.getSource().sId.indexOf("View1--") > -1) {
                    fragName = fragName + oEvent.getSource().getId().split('View1--')[1].split('-')[0];
                }
                else {
                    if (oEvent.getSource().getParent().getLabel() === "Partner") {
                        fragName = fragName + "partner";
                        this.partnerF4Filter();
                    }
                }
                var dialogScreen = sap.ui.xmlfragment(fragName, this);
                this.getView().addDependent(dialogScreen);
                this.fragDialog = dialogScreen;
                this.inputField1 = oEvent.getSource();
                if (oEvent.getSource().sId.indexOf("addPartner") > -1) {
                    this.inputField2 = oEvent.getSource();
                }
                dialogScreen.open();
                if (oEvent.getSource().sId.indexOf("View1--") > -1 && oEvent.getSource().getId().split('View1--')[1] === "field") {
                    this.onSearchPressLiveChange();
                }
                if (oEvent.getSource().sId.indexOf("View1--") > -1 && oEvent.getSource().getId().split('View1--')[1].split('-')[0] === "attorney") {
                    this.attorneyF4Filter(oEvent.getSource().getBindingContext("localModel").getPath().split("/")[2]);
                    this.getView().getModel("localModel").getData().index = oEvent.getSource().getBindingContext("localModel").getPath().split("/")[2];
                }
            },
            //function for closing fragment dynamically
            onCloseDialog: function (oEvent) {
                var oDialog = oEvent.getSource().getParent();
                oDialog.close();
                oDialog.destroy();
            },
            //function for binding the selected item from the table to inputfield dynamically
            onOkDialog: function (oEvent) {
                var oDialog = oEvent.getSource().getParent();
                var oTable = oEvent.getSource().getParent().getContent()[1];
                var oSelectedItem = oTable.getSelectedItem();

                if (oSelectedItem) {
                    var sSelectedField = oSelectedItem.getCells()[0].getText();
                    var oSelectedField = this.inputField1;
                    oSelectedField.setValue(sSelectedField);
                    var sSelectedFieldDescription = oSelectedItem.getCells()[1].getText();
                    oSelectedField.setDescription(sSelectedFieldDescription);

                }
                var sFieldName = this.inputField1.sId.split('View1--')[1];
                if (sFieldName === "contractType" || sFieldName === "primaryGrower" || sFieldName === "plant" || sFieldName === "field") {
                    this.onFieldChange(null, sFieldName);
                }
                oDialog.close();
                oDialog.destroy();
            },
            attorneyOkPress: function (oEvent) {
                var oDialog = oEvent.getSource().getParent();
                var oTable = oEvent.getSource().getParent().getContent()[0];
                var oSelectedItem = oTable.getSelectedItem();
                if (oSelectedItem) {
                    var sSelectedField = oSelectedItem.getCells()[0].getText();
                    var oModel = this.getView().getModel("localModel");
                    var aItems = oModel.getData().partnerActivities;
                    aItems[this.getView().getModel("localModel").getData().index].Power_of_Attrn = sSelectedField;
                    for (var i = 0; i < aItems.length; i++) {
                        if (aItems[i].Partner === aItems[this.getView().getModel("localModel").getData().index].Partner) {
                            aItems[i].Power_of_Attrn = sSelectedField;
                        }
                    }
                    oModel.setProperty("/partnerActivities", aItems);
                }
                oDialog.close();
                oDialog.destroy();

            },
            //function for pushing a new row to the growersplits table on press of OK in addpartner fragment
            addPartnerOkPress: function (oEvent) {
                var oDialog = oEvent.getSource().getParent();
                var oModel = this.getView().getModel("localModel");
                var aItems = oModel.getData().items;
                var ct = oModel.getProperty("/Formdata/contractType");
                var partnerField = oEvent.getSource().getParent().getContent()[0].getItems()[0].getFormContainers()[0].getFormElements()[0].getFields()[0];
                var roleField = oEvent.getSource().getParent().getContent()[0].getItems()[0].getFormContainers()[0].getFormElements()[1].getFields()[0];

                if (partnerField.getValue() != "" && roleField.getSelectedKey() != "") {
                    var oNewRow = {
                        Partner: partnerField.getValue(),
                        Name: partnerField.getDescription(),
                        Role: roleField.getSelectedKey().charAt(0),
                        RoleDescription: roleField.getSelectedKey()
                    };
                    aItems.push(oNewRow);
                    oModel.setProperty("/items", aItems);
                    if (ct != "") {
                        this.oDataCallRAP(partnerField.getValue(), partnerField.getDescription(), roleField.getSelectedKey().charAt(0));
                    }
                    oDialog.close();
                    oDialog.destroy();
                }
                else {
                    sap.m.MessageToast.show("Please enter all the required fields");
                }


            },
            //Dynamic function for searching the first column in the table
            onSearchPressLiveChange: function (oEvent) {
                var aFilter = [];
                if (!oEvent) {
                    var filterField1 = "Plant";
                    var filterField2 = "Account_Number_of_Vendor_or_Creditor";
                    var sSearchValue1 = this.getView().getModel("localModel").getProperty("/Formdata/plant");
                    var sSearchValue2 = this.getView().getModel("localModel").getProperty("/Formdata/primaryGrower");
                    var oBinding = this.fragDialog.getContent()[1].getBinding("items");
                    aFilter = [new sap.ui.model.Filter(filterField1, sap.ui.model.FilterOperator.EQ, sSearchValue1), new sap.ui.model.Filter(filterField2, sap.ui.model.FilterOperator.EQ, sSearchValue2)];
                } else {
                    var filterField1 = oEvent.getSource().getCustomData()[0].getValue();
                    var filterField2 = oEvent.getSource().getCustomData()[1].getValue();
                    var sSearchValue1 = oEvent.getSource().getParent().getContent()[0].getValue();
                    var sSearchValue2 = oEvent.getSource().getParent().getContent()[1].getValue();
                    if (!sSearchValue1 && !sSearchValue2 && filterField1 == "Field_Number") {
                        filterField1 = "Plant";
                        filterField2 = "Account_Number_of_Vendor_or_Creditor";
                        sSearchValue1 = this.getView().getModel("localModel").getProperty("/Formdata/plant");
                        sSearchValue2 = this.getView().getModel("localModel").getProperty("/Formdata/primaryGrower");
                    }

                    var oTable = oEvent.getSource().getParent().getParent().getContent()[1];
                    var oBinding = oTable.getBinding("items");

                    if (oBinding) {
                        if (sSearchValue1) {
                            if (filterField1 == "Grow_Location" || filterField1 == "Elevator_Code" || filterField1 == "Field_Number")
                                var oFilter1 = new sap.ui.model.Filter(filterField1, sap.ui.model.FilterOperator.EQ, sSearchValue1);
                            else var oFilter1 = new sap.ui.model.Filter(filterField1, sap.ui.model.FilterOperator.Contains, sSearchValue1);
                            aFilter.push(oFilter1);
                        }
                        var oFilter2 = new sap.ui.model.Filter(filterField2, sap.ui.model.FilterOperator.Contains, sSearchValue2);
                        aFilter.push(oFilter2);
                    }
                }

                oBinding.filter(aFilter);

            },

            //function for enabling elevator field and release for pricing button based on selection of pricing source
            onPricingSourceSelect: function (oEvent) {
                var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
                var oField1 = this.getView().byId("elementElevator");
                oField1.setVisible(sSelectedKey === "Elevator");
            },
            // function for filtering the partners in partner f4 help present in partner fragment based partners added in the grower splits table
            partnerF4Filter: function () {
                var oModel = this.getView().getModel("localModel");
                var aItems = oModel.getData().items;
                var allPartners = [];
                this.getOwnerComponent().getModel("ContractModel").read("/YYMPU_GM_Vendor_f4", {
                    success: function (oData) {
                        allPartners = oData.results;
                        var nItems = [];
                        for (var i = 0; i < allPartners.length; i++) {
                            var bool = true;
                            for (var j = 0; j < aItems.length; j++) {
                                if (allPartners[i].vendor == aItems[j].Partner) {
                                    bool = false;
                                }
                            }
                            if (bool) {
                                var oNewRow = {
                                    vendor: allPartners[i].vendor,
                                    Name: allPartners[i].Name
                                };
                                nItems.push(oNewRow);
                            }
                        }
                        oModel.setProperty("/partners", nItems);
                    }.bind(this),
                    error: function () {
                        console.log("errorRAP");
                    }
                });
            },
            //function to capture the changes of all the fields and make corresponding oData calls to autopopulate other fields
            onFieldChange: function (oEvent, sInput) {
                var inputField;
                var model = this.getView().getModel("localModel");
                if (oEvent != null)
                    inputField = oEvent.getSource().sId.split('View1--')[1];
                else
                    inputField = sInput;
                var url = "";
                var sContractType = this.getView().getModel("localModel").getProperty("/Formdata/contractType");
                var sPlant = this.getView().getModel("localModel").getProperty("/Formdata/plant");
                var sPrimaryGrower = this.getView().getModel("localModel").getProperty("/Formdata/primaryGrower");
                var iField = this.getView().getModel("localModel").getProperty("/Formdata/field");
                iField = iField.replace(/,/g, '');
                var iCompanyCode = this.getView().getModel("localModel").getProperty("/Formdata/companyCode");
                var iCropYear = this.getView().getModel("localModel").getProperty("/Formdata/cropYear");
                var sMaterial = this.getView().getModel("localModel").getProperty("/itemTableData/" + 0 + "/Material");
                switch (inputField) {
                    case "primaryGrower":
                    case "plant":
                    case "field":
                        url = "/odata/v4/catalog/Field_Table?$filter=Account_Number_of_Vendor_or_Creditor eq '" + sPrimaryGrower + "' and Plant eq '" + sPlant + "' and Field_Number eq " + iField
                        if (iField && sPrimaryGrower && sPlant)
                            this.oDataCall(url, inputField);
                        else {
                            if (!sPrimaryGrower || !sPlant) model.setProperty("/Formdata/growLocation", "");
                            model.setProperty("/Formdata/estimatedContractedArea", "");
                            model.setProperty("/Formdata/estimatedGrossYield", "");
                            model.setProperty("/Formdata/field", "");
                            model.setProperty("/Formdata/fieldDescription", "");
                        }

                        if (inputField === "primaryGrower" || inputField === "plant") {
                            url = "/odata/v4/catalog/Field_Table?$filter=Account_Number_of_Vendor_or_Creditor eq '" + sPrimaryGrower + "' and Plant eq '" + sPlant + "'"
                            if (sPrimaryGrower && sPlant) {
                                this.oDataCall(url, inputField);
                            }

                            if (inputField === "plant") {
                                url = "/odata/v4/catalog/Parameters_For_Grower_Accounting_GuiXT?$filter=Plant eq " + "'" + sPlant + "'";
                                this.oDataCall(url, inputField);

                                url = "/odata/v4/catalog/Parameters_For_Grower_Accounting_GuiXT?$filter=Plant eq '" + sPlant + "' and Order_Type eq '" + sContractType + "'"
                                //console.log(" a" + sPlant + " " + sContractType + "a")
                                this.oDataCall2(url);

                                url = "/odata/v4/catalog/Material_Plant_and_Crop_Year_Table?$filter=Plant eq '" + sPlant + "' and Season_Year eq " + iCropYear + " and Company_Code eq " + iCompanyCode + " and Material_Number eq '" + sMaterial + "'";
                                if (sPlant && iCropYear && iCompanyCode && sMaterial)
                                    this.oDataCallEYPA(url);

                            }
                        }
                        break;

                    case "contractType":

                        url = "/odata/v4/catalog/Parameters_For_Grower_Accounting_GuiXT?$filter=Plant eq '" + sPlant + "' and Order_Type '" + sContractType + "'"
                        //console.log(" a" + sPlant + " " + sContractType + "a")
                        this.oDataCall2(url);

                        url = "/odata/v4/catalog/Material_Plant_and_Crop_Year_Table?$filter=Plant eq '" + sPlant + "' and Season_Year eq " + iCropYear + " and Company_Code eq " + iCompanyCode + " and Material_Number eq '" + sMaterial + "'";
                        if (sPlant && iCropYear && iCompanyCode && sMaterial)
                            this.oDataCallEYPA(url);


                        url = "/odata/v4/catalog/US_Seed_Contract_Table?$filter=Purchasing_Document_Type eq " + "'" + sContractType + "'";
                        this.oDataCall(url, inputField);
                        break;

                    case "cropYear":
                        url = "/odata/v4/catalog/Material_Plant_and_Crop_Year_Table?$filter=Plant eq '" + sPlant + "' and Season_Year eq " + iCropYear + " and Company_Code eq " + iCompanyCode + " and Material_Number eq '" + sMaterial + "'";
                        if (sPlant && iCropYear && iCompanyCode && sMaterial)
                            //console.log("cropyear");
                            this.oDataCallEYPA(url);
                        else if (!sPlant && !iCropYear && iCompanyCode) {
                            model.setProperty("/Formdata/estimatedYieldPerAreaUoM", "");
                            model.setProperty("/Formdata/estimatedGrossYield", "");
                        }

                        break;

                    default:

                }

            },
            // function to filter and auto populate rquired fields
            oDataCall: function (url, inputField) {
                var model = this.getView().getModel("localModel");
                var formData = model.getProperty("/Formdata");
                var iECA = model.getProperty("/Formdata/estimatedContractedArea");
                var iEYPA = model.getProperty("/Formdata/estimatedYieldPerAreaUoM");
                var that = this;

                var requestData = {
                    method: 'GET',
                    headers: { "Content-type": "application/json" },
                    success: handleSuccess,
                    error: handleError
                };

                $.ajax(url, requestData);

                function handleSuccess(data) {
                    if (data.value[0]) {
                        handleData(data.value[0]);
                    } else {
                        handleNoData();
                    }
                }

                function handleError() {
                    console.error("Error occurred in the OData call.");
                }

                function handleData(dataItem) {
                    switch (inputField) {
                        case "primaryGrower":
                            model.setProperty("/Formdata/growLocation", dataItem.Growing_Location);
                            if (formData.field) {
                                model.setProperty("/Formdata/estimatedContractedArea", dataItem.Est_Total_Field_Acres);
                                //EGY
                                iECA = dataItem.Est_Total_Field_Acres;
                                if (iECA && iEYPA) model.setProperty("/Formdata/estimatedGrossYield", iECA * iEYPA);

                            }
                            break;

                        case "contractType":
                            model.setProperty("/Formdata/specie", dataItem.Specie);
                            var sSpecie = model.getProperty("/Formdata/specie");
                            var url2 = "/odata/v4/catalog/Specie_Table?$filter=Specie eq " + "'" + sSpecie + "'";
                            that.oDataCall(url2, "specieDesc");

                            var oSpecie = {
                                SB: "BEAN-ESTYIELD",
                                SC: "CORN-ESTYIELD",
                                SH: "WHEA-ESTYIELD",
                                SL: "CANO-ESTYIELD",
                                SS: "SORG-ESTYIELD",
                                ST: "COTT-ESTYIELD"
                            }
                            var sSpecie1 = oSpecie[model.getProperty("/Formdata/specie")];

                            url = "/odata/v4/catalog/Custom_Parameter_Values?$filter=YYkey eq '" + sSpecie1 + "'";
                            that.oDataCall(url, "specie");

                            break;

                        case "plant":
                            if (dataItem.Growing_Location)
                                model.setProperty("/Formdata/growLocation", dataItem.Growing_Location);
                            if (dataItem.Contract_Area_UOM_Text)
                                model.setProperty("/Formdata/estimatedContractedAreaDescription", dataItem.Contract_Area_UOM_Text);
                            if (dataItem.Estimated_Yield_UOM_Text && dataItem.Contract_Area_UOM_Text)
                                model.setProperty("/Formdata/estimatedYieldPerAreaUoMDescription", dataItem.Estimated_Yield_UOM_Text + " Per " + dataItem.Contract_Area_UOM_Text);
                            if (dataItem.Estimated_Yield_UOM_Text)
                                model.setProperty("/Formdata/estimatedGrossYieldDescription", dataItem.Estimated_Yield_UOM_Text);
                            if (dataItem.Estimated_Yield_UOM_Text && dataItem.Contract_Area_UOM_Text)
                                model.setProperty("/Formdata/guaranteeYieldDescription", dataItem.Estimated_Yield_UOM_Text + " Per " + dataItem.Contract_Area_UOM_Text);
                            if (formData.primaryGrower && formData.field) {
                                model.setProperty("/Formdata/estimatedContractedArea", dataItem.Est_Total_Field_Acres);
                                //EGY
                                iECA = dataItem.Est_Total_Field_Acres;
                                if (iECA && iEYPA) model.setProperty("/Formdata/estimatedGrossYield", iECA * iEYPA);

                            }
                            break;

                        case "field":
                            model.setProperty("/Formdata/estimatedContractedArea", dataItem.Est_Total_Field_Acres);
                            //EGY
                            iECA = dataItem.Est_Total_Field_Acres;
                            if (iECA && iEYPA) model.setProperty("/Formdata/estimatedGrossYield", iECA * iEYPA);

                            break;
                        case "specieDesc":
                            model.setProperty("/Formdata/specieDescription", dataItem.Specie_Description);
                            break;
                        case "specie":
                            if (dataItem.Field_Value) {
                                model.setProperty("/Formdata/estimatedYieldPerAreaUoM", dataItem.Field_Value);
                                //EGY
                                iEYPA = dataItem.Field_Value;
                                if (iECA && iEYPA) model.setProperty("/Formdata/estimatedGrossYield", iECA * iEYPA);

                            }

                            break;

                        default:

                    }
                }

                function handleNoData() {
                    switch (inputField) {
                        case "contractType":
                            model.setProperty("/Formdata/specie", "");
                            model.setProperty("/Formdata/specieDescription", "");
                            model.setProperty("/Formdata/estimatedYieldPerAreaUoM", "");
                            model.setProperty("/Formdata/estimatedGrossYield", "");
                            break;

                        case "primaryGrower":
                            model.setProperty("/value", []);
                            model.setProperty("/Formdata/field", "");
                            model.setProperty("/Formdata/fieldDescription", "");
                            model.setProperty("/Formdata/growLocation", "");
                            model.setProperty("/Formdata/estimatedContractedArea", "");
                            model.setProperty("/Formdata/estimatedGrossYield", "");
                            break;

                        case "plant":
                            model.setProperty("/Formdata/field", "");
                            model.setProperty("/Formdata/fieldDescription", "");
                            model.setProperty("/Formdata/estimatedContractedAreaDescription", "");
                            model.setProperty("/Formdata/estimatedYieldPerAreaUoMDescription", "");
                            model.setProperty("/Formdata/estimatedGrossYieldDescription", "");
                            model.setProperty("/Formdata/guaranteeYieldDescription", "");
                            model.setProperty("/Formdata/growLocation", "");
                            model.setProperty("/Formdata/estimatedContractedArea", "");
                            model.setProperty("/Formdata/estimatedGrossYield", "");
                            break;

                        case "field":
                            model.setProperty("/Formdata/estimatedContractedArea", "");
                            model.setProperty("/Formdata/estimatedGrossYield", "");
                            break;

                        case "specieDesc":
                            model.setProperty("/Formdata/specieDescription", "");
                            break;

                        case "specie":
                            model.setProperty("/Formdata/estimatedYieldPerAreaUoM", "");
                            model.setProperty("/Formdata/estimatedGrossYield", "");
                            break;

                        default:

                    }
                }
            },
            oDataCallEYPA: function (url) {
                //var that = this;
                var model = this.getView().getModel("localModel");
                var iECA = model.getProperty("/Formdata/estimatedContractedArea");
                var iEYPA = model.getProperty("/Formdata/estimatedYieldPerAreaUoM");
                $.ajax({
                    url,
                    method: 'GET',
                    headers: { "Content-type": "application/json" },
                    success: function (data) {
                        if (data.value[0]) {
                            console.log(data.value[0].Estimated_Yield_Target + "a");
                            model.setProperty("/Formdata/estimatedYieldPerAreaUoM", data.value[0].Estimated_Yield_Target);
                            //EGY
                            iEYPA = data.value[0].Estimated_Yield_Target;
                            if (iECA && iEYPA) model.setProperty("/Formdata/estimatedGrossYield", iECA * iEYPA);
                        }
                        else {
                            model.setProperty("/Formdata/estimatedYieldPerAreaUoM", "");
                            model.setProperty("/Formdata/estimatedGrossYield", "");
                        }
                    },
                    error: function () {

                        console.log("error in EYPA odata call (Nodata) ");
                    }
                });
            },
            oDataCallRAP: function (partner, partnerDescription, role) {
                var oModel = this.getView().getModel("localModel");
                var ct = oModel.getProperty("/Formdata/contractType");
                var aItems1 = oModel.getData().partnerActivities;
                var afilter = [new sap.ui.model.Filter("contract_type", sap.ui.model.FilterOperator.EQ, ct)];
                this.getOwnerComponent().getModel("ContractModel").read("/ZBYGL_S2P_C_MPS", {
                    filters: afilter,
                    success: function (oData) {
                        if (oData.results.length > 0) {
                            for (var i = 0; i < oData.results.length; i++) {
                                var oNewRow = {
                                    Partner: partner,
                                    Name: partnerDescription,
                                    Role: role,
                                    Activity_No: oData.results[i].service_material,
                                    Activity_Desc: oData.results[i].service_material_desc,
                                    Percentage: "",
                                    Power_of_Attrn: ""
                                };
                                aItems1.push(oNewRow);
                            }
                            oModel.setProperty("/partnerActivities", aItems1);
                        }
                    }.bind(this),
                    error: function () {
                        console.log("error");
                    }
                });

            },
            // function to add/change primary grower in the grower splits table on click of growersplits tab
            onFilterSelect: function (oEvent) {
                var sKey = oEvent.getParameter("key")
                if (sKey === "GS" && this.getOwnerComponent().getModel("localModel").getData().action === "create") {
                    var oModel = this.getView().getModel("localModel");
                    var aItems = oModel.getData().items;
                    var aItems1 = oModel.getData().partnerActivities;
                    if (oModel.getProperty("/Formdata/primaryGrower") === "" || oModel.getProperty("/Formdata/contractType") === "") {
                        aItems1 = [];
                        oModel.setProperty("/partnerActivities", aItems1);
                    }
                    else {
                        if (aItems.length == 0) {
                            this.oDataCallRAP(oModel.getProperty("/Formdata/primaryGrower"), oModel.getProperty("/Formdata/primaryGrowerDescription"), "P");
                        }
                        else if (aItems.length > 0 && aItems1.length == 0) {
                            for (var i = 0; i < aItems.length; i++) {
                                this.oDataCallRAP(aItems[i].Partner, aItems[i].Name, aItems[i].Role);
                            }
                        }
                        else if (aItems.length > 0 && aItems1.length > 0) {
                            if (oModel.getProperty("/Formdata/contractType") != oModel.getData().contractType && oModel.getProperty("/Formdata/primaryGrower") === oModel.getData().primaryGrower) {
                                aItems1 = [];
                                oModel.setProperty("/partnerActivities", aItems1);
                                for (var i = 0; i < aItems.length; i++) {
                                    this.oDataCallRAP(aItems[i].Partner, aItems[i].Name, aItems[i].Role);
                                }
                            }

                        }

                    }

                    if (oModel.getProperty("/Formdata/primaryGrower") === "") {
                        aItems = [];
                        oModel.setProperty("/items", aItems);
                        this.byId("addPartner").setEnabled(false);
                    }
                    if (oModel.getProperty("/Formdata/primaryGrower") != "" && aItems.length > 0) {
                        this.byId("addPartner").setEnabled(true);
                        if (oModel.getProperty("/Formdata/primaryGrower") != oModel.getData().primaryGrower) {
                            for (var i = 1; i < aItems.length; i++) {
                                if (aItems[i].Partner === oModel.getProperty("/Formdata/primaryGrower")) {
                                    aItems.splice(i, 1);
                                    oModel.setProperty("/items", aItems);
                                    break;
                                }
                            }

                            aItems[0].Partner = oModel.getProperty("/Formdata/primaryGrower"),
                                aItems[0].Name = oModel.getProperty("/Formdata/primaryGrowerDescription"),
                                oModel.setProperty("/items", aItems);
                        }
                        if (aItems1.length > 0 && oModel.getProperty("/Formdata/contractType") != "" && oModel.getProperty("/Formdata/primaryGrower") != oModel.getData().primaryGrower) {
                            aItems1 = [];
                            oModel.setProperty("/partnerActivities", aItems1);
                            for (var i = 0; i < aItems.length; i++) {
                                this.oDataCallRAP(aItems[i].Partner, aItems[i].Name, aItems[i].Role);
                            }
                        }

                    }
                    else if (aItems.length == 0 && oModel.getProperty("/Formdata/primaryGrower") != "") {
                        this.byId("addPartner").setEnabled(true);
                        aItems = [];
                        var oNewRow = {
                            Partner: oModel.getProperty("/Formdata/primaryGrower"),
                            Name: oModel.getProperty("/Formdata/primaryGrowerDescription"),
                            Role: "P",
                            RoleDescription: "Primary Grower"
                        };
                        aItems.push(oNewRow);
                        oModel.setProperty("/items", aItems);
                    }
                    oModel.setProperty("/primaryGrower", oModel.getProperty("/Formdata/primaryGrower"));
                    oModel.setProperty("/contractType", oModel.getProperty("/Formdata/contractType"));
                }
            },
            // function for filtering the partners in power of attorney f4 help present in attorney fragment.
            attorneyF4Filter: function (index) {
                var oModel = this.getView().getModel("localModel");
                var aItems = [];
                var allPartners = oModel.getData().items;
                var sVal = "/partnerActivities/" + index + "/Partner";
                for (var i = 0; i < allPartners.length; i++) {
                    if (allPartners[i].Partner != oModel.getProperty(sVal)) {
                        var oNewRow = {
                            vendor: allPartners[i].Partner,
                            Name: allPartners[i].Name
                        };
                        aItems.push(oNewRow);
                    }
                    oModel.setProperty("/attorneyPartners", aItems);
                }

            },
            onSortIconPress: function (oEvent) {
                var oBinding = this.getView().byId('attorney').getBinding("items");
                var gSorter = [];
                if (oEvent.getSource().getId().indexOf("partner") > -1) {
                    gSorter = [new sap.ui.model.Sorter("Partner", false)];
                } else {
                    gSorter = [new sap.ui.model.Sorter("Activity_No", false)];
                }
                oBinding.sort(gSorter);
            },
            // function to get the row index of which the delete button is pressed
            onDeleteButton: function (oEvent) {
                var oButton = oEvent.getSource();
                var oContext = oButton.getBindingContext("localModel");
                var oModel = this.getView().getModel("localModel");
                var aItems = oModel.getProperty("/items");
                var aItems1 = oModel.getData().partnerActivities;
                if (oContext) {
                    var index = oContext.getPath().split('/items/')[1];
                    for (var i = 0; i < aItems1.length; i++) {
                        if (aItems1[i].Partner === aItems[index].Partner) {
                            aItems1.splice(i, 1);
                            i = i - 1;
                        }
                        if (aItems1[i].Power_of_Attrn === aItems[index].Partner) {
                            aItems1[i].Power_of_Attrn = "";
                        }
                    }
                    oModel.setProperty("/partnerActivities", aItems1);


                    aItems.splice(index, 1);
                    oModel.setProperty("/items", aItems);
                }
                else {
                    console.error("Binding context not found");
                }
            },

            oDataCall2: function (url) {
                var that = this;
                $.ajax({
                    url,
                    method: 'GET',
                    headers: { "Content-type": "application/json" },
                    success: function (data) {
                        if (data.value[0]) {
                            //console.log(data.value[0].Company_Code)                            
                            that.getView().getModel("localModel").setProperty("/Formdata/companyCode", data.value[0].Company_Code);
                            that.getView().getModel("localModel").setProperty("/Formdata/purchasingOrganization", data.value[0].Purchasing_Organization);
                            that.getView().getModel("localModel").setProperty("/Formdata/purchasingGroup", data.value[0].Purchasing_Group);
                        }
                    },
                    error: function () {
                        console.log("error in odata call 2");
                    }
                });
            },
            onSubmitPress: function (oEvent) {
                // var url = "/odata/v4/catalog/Parameters_For_Grower_Accounting_GuiXT?$filter=Plant eq " + this.getView().getModel("localModel").getProperty("/Formdata/plant");
                // this.oDataCall2(url);
                // var aItems = [];
                // for (var i = 0; i < this.getView().getModel("localModel").getProperty("/itemTableData").length; i++) {
                //     var oNewRow = {
                //         PurchaseContractItem: this.getView().getModel("localModel").getProperty("/itemTableData/" + i + "/Item"),
                //         PurchaseContractItemText: this.getView().getModel("localModel").getProperty("/itemTableData/" + i + "/MaterialDescription"),
                //         CompanyCode: this.getView().getModel("localModel").getProperty("/Formdata/companyCode"),
                //         Plant: this.getView().getModel("localModel").getProperty("/Formdata/plant"),
                //         MaterialGroup: this.getView().getModel("localModel").getProperty("/itemTableData/" + i + "/MaterialGroup"),
                //         TargetQuantity: this.getView().getModel("localModel").getProperty("/itemTableData/" + i + "/Quantity"),
                //         OrderPriceUnit: this.getView().getModel("localModel").getProperty("/itemTableData/" + i + "/UoM"),
                //         OrderQuantityUnit: this.getView().getModel("localModel").getProperty("/itemTableData/" + i + "/UoM"),
                //         OrderPriceUnitToOrderUnitNmrtr: "1",
                //         OrdPriceUnitToOrderUnitDnmntr: "1",
                //         ContractNetPriceAmount: "",
                //         NetPriceQuantity: "1",
                //         AccountAssignmentCategory: "U",
                //         Material: this.getView().getModel("localModel").getProperty("/itemTableData/" + i + "/Material")
                //     };
                //     aItems.push(oNewRow);
                // }
                var oMap = new Map();
                for (var i = 0; i < this.getView().getModel("localModel").getData().partnerActivities.length; i++) {
                    var percentage = Number(this.getView().getModel("localModel").getData().partnerActivities[i].Percentage, 10);
                    if (oMap.size > 0 && oMap.has(this.getView().getModel("localModel").getData().partnerActivities[i].Activity_No)) {
                        oMap.set(this.getView().getModel("localModel").getData().partnerActivities[i].Activity_No, oMap.get(this.getView().getModel("localModel").getData().partnerActivities[i].Activity_No) + percentage);
                    }
                    else {
                        oMap.set(this.getView().getModel("localModel").getData().partnerActivities[i].Activity_No, percentage);
                    }
                }
                oMap.forEach(function (value, key) {
                    if (value != 100) {
                        sap.m.MessageToast.show("Percentage is not equal to 100 for " + key + " Activity");
                        return;
                    }
                })

                var conTractData = {
                    "PurchaseContractType": "ZMKK",
                    "CompanyCode": "1710",
                    "CreationDate": "\/Date(1701129600000)\/",
                    "Supplier": "1000142367",
                    "PurchasingOrganization": "1710",
                    "PurchasingGroup": "DEC",
                    "DocumentCurrency": "EUR",
                    "ValidityStartDate": "2024-02-08T00:00:00",
                    "ValidityEndDate": "2024-06-08T00:00:00",
                    "to_PurchaseContractItem": {
                        "results": [
                            {
                                "PurchaseContractItem": "10",
                                "PurchaseContractItemText": "Testing the API",
                                "CompanyCode": "1710",
                                "Plant": "1710",
                                "MaterialGroup": "L004",
                                "TargetQuantity": "1",
                                "OrderPriceUnit": "KG",
                                "OrderQuantityUnit": "KG",
                                "OrderPriceUnitToOrderUnitNmrtr": "1",
                                "OrdPriceUnitToOrderUnitDnmntr": "1",
                                "ContractNetPriceAmount": "111.00",
                                "NetPriceQuantity": "1",
                                "AccountAssignmentCategory": "U",
                                "Material": "624"
                            }
                        ]
                    }
                };
                this.getOwnerComponent().getModel("ReadContractModel").create("/A_PurchaseContract", conTractData, {
                    success: function (oData) {
                        console.log("Success" + Object.keys(oData));
                    },
                    error: function (oData) {
                        console.log(Object.keys(oData));
                    }
                });
                // this.oBatchOperations = [];
                // var batchModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/API_PURCHASECONTRACT_PROCESS_SRV/", true);
                // //var batchModel = this.getOwnerComponent().getModel();
                // var oBatchOperation = batchModel.createBatchOperation("A_PurchaseContract", "POST", conTractData);
                // this.oBatchOperations.push(oBatchOperation);
                // batchModel.addBatchChangeOperations(this.oBatchOperations);
                // batchModel.submitBatch(function () {
                //     alert("success");
                // }, function (error) {
                //     alert("error");
                // }, true);
            },
            //function to open material selection screen fragment
            onAddMaterialPress: function (oEvent) {
                var dialogScreen = sap.ui.xmlfragment("gmuiwebapp.Fragment.material", this);
                this.getView().addDependent(dialogScreen);
                dialogScreen.getItems()[0].open();
            },
            //function to search material on live change
            onMaterialSearchLiveChange: function (oEvent) {
                var searchField1 = oEvent.getSource().getCustomData()[0].getValue();
                var searchField2 = oEvent.getSource().getCustomData()[1].getValue();
                var filterValue1 = oEvent.getSource().getParent().getContent()[0].getValue();
                var filterValue2 = oEvent.getSource().getParent().getContent()[1].getValue();
                var oTable = oEvent.getSource().getParent().getParent().getContent()[1];
                var oBinding = oTable.getBinding("items");
                var oFilter1 = new sap.ui.model.Filter(searchField1, sap.ui.model.FilterOperator.Contains, filterValue1);
                var oFilter2 = new sap.ui.model.Filter(searchField2, sap.ui.model.FilterOperator.Contains, filterValue2);
                var aFilter = [oFilter1, oFilter2];
                oBinding.filter(aFilter);
            },
            //function to add row into material table
            onMaterialSaveDialog: function (oEvent) {
                var matTable = this.getView().byId("idItemTable");
                var oTable = oEvent.getSource().getParent().getContent()[1];
                if (oTable.getSelectedItems().length === 0) {
                    sap.m.MessageToast.show("Please select a row to add");
                    return;
                }
                var arr = [];
                if (matTable.getItems().length > 0) {
                    arr = this.getView().getModel("localModel").getData().itemTableData;
                }
                var obj = {};
                obj.Item = (arr.length + 2) * 10;
                obj.Material = oTable.getSelectedItems()[0].getCells()[0].getText();
                obj.MaterialDescription = oTable.getSelectedItems()[0].getCells()[1].getText();
                obj.UoM = oTable.getSelectedItems()[0].getCells()[2].getText();
                obj.MaterialGroup = oTable.getSelectedItems()[0].getCells()[3].getText();
                arr.push(obj);
                obj = {};
                this.getView().getModel("localModel").getData().itemTableData = arr;

                var sPlant = this.getView().getModel("localModel").getProperty("/Formdata/plant");
                var iCompanyCode = this.getView().getModel("localModel").getProperty("/Formdata/companyCode");
                var iCropYear = this.getView().getModel("localModel").getProperty("/Formdata/cropYear");
                var sMaterial = this.getView().getModel("localModel").getProperty("/itemTableData/" + 0 + "/Material");

                //console.log("a" + sPlant + "a" + iCompanyCode + "a" + iCropYear + "a"  + sMaterial + "a")
                var url = "/odata/v4/catalog/Material_Plant_and_Crop_Year_Table?$filter=Plant eq '" + sPlant + "' and Season_Year eq " + iCropYear + " and Company_Code eq " + iCompanyCode + " and Material_Number eq '" + sMaterial + "'";
                if (sPlant && iCropYear && iCompanyCode && sMaterial)
                    this.oDataCallEYPA(url)

                this.onCloseDialog(oEvent);
            },
            //function to delete row from material table
            onDeleteMaterial: function (oEvent) {
                var contextPath = oEvent.getSource().getParent().getBindingContextPath();
                var index = Number(contextPath.split("/")[2]);
                var oItems = this.getView().getModel("localModel").getData().itemTableData;
                var iLength = oItems.length;
                oItems.splice(index, 1);
                for (var i = index; i < oItems.length; i++) {
                    oItems[i].Item = (i + 2) * 10;
                }
                this.getView().getModel("localModel").getData().itemTableData = oItems;
                if (iLength == 1) {
                    var oSpecie = {
                        SB: "BEAN-ESTYIELD",
                        SC: "CORN-ESTYIELD",
                        SH: "WHEA-ESTYIELD",
                        SL: "CANO-ESTYIELD",
                        SS: "SORG-ESTYIELD",
                        ST: "COTT-ESTYIELD"
                    }
                    var sSpecie = oSpecie[this.getView().getModel("localModel").getProperty("/Formdata/specie")];
                    // console.log(oItems.length);
                    // console.log(sSpecie);
                    var url = "/odata/v4/catalog/Custom_Parameter_Values?$filter=YYkey eq '" + sSpecie + "'";
                    this.oDataCall(url, "specie");
                }
                else if (index == 0) {

                    var sPlant = this.getView().getModel("localModel").getProperty("/Formdata/plant");
                    var iCompanyCode = this.getView().getModel("localModel").getProperty("/Formdata/companyCode");
                    var iCropYear = this.getView().getModel("localModel").getProperty("/Formdata/cropYear");
                    var sMaterial = this.getView().getModel("localModel").getProperty("/itemTableData/" + 0 + "/Material");

                    var url = "/odata/v4/catalog/Material_Plant_and_Crop_Year_Table?$filter=Plant eq '" + sPlant + "' and Season_Year eq " + iCropYear + " and Company_Code eq " + iCompanyCode + " and Material_Number eq '" + sMaterial + "'";
                    if (sPlant && iCropYear && iCompanyCode && sMaterial)
                        //console.log("cropyear");
                        this.oDataCallEYPA(url)
                }


            },
            //function to determine action (create/display/edit)
            initializeAction: function (oEvent) {
                var actionFromTile = jQuery.sap.getUriParameters().get("action");
                this.getOwnerComponent().getModel("localModel").getData().action = actionFromTile;
            },
            //function to search contract on live change
            onContractSearchLiveChange: function (oEvent) {
                var oTable = this.getView().byId("idContractListTable");
                var searchField = oTable.getColumns()[0].getHeader().getItems()[1].getCustomData();
                var oBinding = oTable.getBinding("items");
                var aFilter = [];
                aFilter.push(new sap.ui.model.Filter(searchField[0].getValue(), sap.ui.model.FilterOperator.Contains, oTable.getColumns()[0].getHeader().getItems()[1].getValue()));
                aFilter.push(new sap.ui.model.Filter(searchField[1].getValue(), sap.ui.model.FilterOperator.Contains, oTable.getColumns()[1].getHeader().getItems()[1].getValue()));
                aFilter.push(new sap.ui.model.Filter(searchField[2].getValue(), sap.ui.model.FilterOperator.Contains, oTable.getColumns()[2].getHeader().getItems()[1].getValue()));
                aFilter.push(new sap.ui.model.Filter(searchField[3].getValue(), sap.ui.model.FilterOperator.Contains, oTable.getColumns()[3].getHeader().getItems()[1].getValue()));
                aFilter.push(new sap.ui.model.Filter(searchField[4].getValue(), sap.ui.model.FilterOperator.Contains, oTable.getColumns()[7].getHeader().getItems()[1].getValue()));
                oBinding.filter(aFilter);
            },
            //function to open details of contract
            onClickDisplayChange: function (oEvent) {
                var data1 = this.getOwnerComponent().getModel("localModel").getData();
                var data2 = this.getOwnerComponent().getModel("localContractModel").getData();
                if (oEvent.sId === "navButtonPress") {
                    this.getView().byId("idContractListTable").setVisible(true);
                    this.getView().byId("idContractContainer").setVisible(false);
                    this.getView().byId("idCreatePage").setShowNavButton(false);
                    this.getView().byId("idCreatePage").setTitle("Display/Change Contract");
                    data1.action = "display";
                } else {
                    if (oEvent.getSource().getId().indexOf("idDisplayChangeToggle") > -1 && oEvent.getSource().getIcon() === "sap-icon://display") {
                        data1.action = "display";
                        this.getView().byId("idContractListTable").setVisible(false);
                        this.getView().byId("idContractContainer").setVisible(true);
                        this.getView().byId("idCreatePage").setTitle("Display Contract - " + data1.contNumber);
                        return;
                    } else if (oEvent.getSource().getId().indexOf("idDisplayChangeToggle") > -1 && oEvent.getSource().getIcon() === "sap-icon://edit") {
                        data1.action = "change";
                        this.getView().byId("idContractListTable").setVisible(false);
                        this.getView().byId("idContractContainer").setVisible(true);
                        this.getView().byId("idCreatePage").setTitle("Change Contract - " + data1.contNumber);
                        return;
                    }
                    var contNumber = oEvent.getSource().getParent().getParent().getCells()[0].getText();
                    data1.contNumber = contNumber;
                    var readRequestURL = "/A_PurchaseContract('" + contNumber + "')";
                    this.getOwnerComponent().getModel("ReadContractModel").read(readRequestURL, {
                        urlParameters: {
                            $expand: "to_PurchaseContractItem"
                        },
                        success: function (oData) {
                            data2.Formdata = oData;
                            data2.itemTableData = oData.to_PurchaseContractItem.results;
                            this.Formatter.fieldMapping(data1, data2);
                        }.bind(this),
                        error: function (oData) {
                            console.log("error");
                        }
                    });
                    if (oEvent.getSource().getIcon().indexOf("display") > -1) {
                        data1.action = "display";
                        this.getView().byId("idContractListTable").setVisible(false);
                        this.getView().byId("idContractContainer").setVisible(true);
                        this.getView().byId("idCreatePage").setShowNavButton(true);
                        this.getView().byId("idCreatePage").setTitle("Display Contract - " + contNumber);
                    } else if (oEvent.getSource().getIcon().indexOf("edit") > -1) {
                        data1.action = "change";
                        this.getView().byId("idContractListTable").setVisible(false);
                        this.getView().byId("idContractContainer").setVisible(true);
                        this.getView().byId("idCreatePage").setShowNavButton(true);
                        this.getView().byId("idCreatePage").setTitle("Change Contract - " + contNumber);
                    }
                }
            }
        });
    });
