const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
	const { YYMPU_C_EKKO } = this.entities;
	const bupa = await cds.connect.to('ZBYGL_S2P_C_SB_CONTRACT');    //Replace SEPMRA_PROD_MAN with your service name, ie. edmx file name
	this.on('READ', 'YYMPU_C_EKKO', req => {

		   //Replace SEPMRA_I_PriceClassification with the entity name
		   console.log("query");
		   console.log(req.query.log);
		return bupa.run(req.query);
	});
  });

//module.exports = cds.service.impl(async function() {
// module.exports = async function (srv) {
//     const { YYMPU_C_EKKO } = this.entities;
//     const service = await cds.connect.to('ZBYGL_S2P_C_SB_CONTRACT');
//     srv.on('READ', YYMPU_C_EKKO, async(request) => {
//         return service.tx(request).run(request.query);
//     });
// };