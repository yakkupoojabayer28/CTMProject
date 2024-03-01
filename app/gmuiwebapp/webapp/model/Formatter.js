sap.ui.define([], function () {
	"use strict";

	return {
		fieldMapping: function (data1, data2) {
			data1.Formdata.primaryGrower = data2.Formdata.Supplier;
			data1.Formdata.contractType = data2.Formdata.PurchaseContractType;
			data1.Formdata.contractDate = data2.Formdata.CreationDate;
			data1.Formdata.plant = data2.itemTableData[0].Plant;
			var arr = [];
			var obj = {};
			for (var i = 0; i < data2.itemTableData.length; i++) {
				obj.Item = data2.itemTableData[i].PurchaseContractItem;
				obj.Material = data2.itemTableData[i].Material;
				obj.MaterialDescription = data2.itemTableData[i].PurchaseContractItemText;
				obj.UoM = data2.itemTableData[i].OrderQuantityUnit;
				obj.Quantity = data2.itemTableData[i].TargetQuantity;
				obj.MaterialGroup = data2.itemTableData[i].MaterialGroup;
				arr.push(obj);
				obj = {};
			}
			data1.itemTableData = arr;
		},
		formatNumberWithoutCommas: function(iNumber) {
			if (typeof iNumber === "number" || typeof iNumber === "string") {
			  return iNumber.toString().replace(/,/g, '');
			}
			return ""; 
		  }
	};

});