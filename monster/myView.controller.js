jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("monster.myView", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf monster.myView
     */
    onInit: function() {
        var oModel = new sap.ui.model.odata.ODataModel("http://services.odata.org/Northwind/Northwind.svc/", true);
        this.getView().setModel(oModel);
    },

    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf monster.myView
     */
    //  onBeforeRendering: function() {
    //
    //  },

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf monster.myView
     */
    //  onAfterRendering: function() {
    //
    //  },

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf monster.myView
     */
    //  onExit: function() {
    //
    //  }

    onSearch: function(oEvt) {
        var oFilter = null;
        var sQuery = oEvt.getSource().getValue();

        if (sQuery && sQuery.length > 0) {
            oFilter = new sap.ui.model.Filter("ProductName", sap.ui.model.FilterOperator.Contains, sQuery);
        }
        this.getView().byId("idProductsTable").getBinding("items").filter(oFilter);
    },

    onMonsterSelected: function(oEvent) {
        var oDetailView = app.getPage('detailView');
        if(!oDetailView) {
            oDetailView = sap.ui.view({
                id:"detailView",
                viewName:"monster.MonsterDetail",
                type:sap.ui.core.mvc.ViewType.XML
            });
            oDetailView.setModel(this.getView().getModel());
            app.addPage(oDetailView);
        }

        oDetailView.bindElement({
            path: oEvent.getSource().getBindingContextPath(),
            parameters: {
                expand: 'Supplier'
            }
        });

        app.to('detailView');

    },

    getUrl: function(sUrl) {
        if (sUrl === "")
            return sUrl;
        if (window.location.hostname == "localhost") {
            return "proxy" + sUrl;
        } else {
            return sUrl;
        }
    }

});