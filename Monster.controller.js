jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
sap.ui.core.mvc.Controller.extend("monster.demo.Monster", {

    onInit: function() {
        var oModel = new sap.ui.model.odata.ODataModel("http://services.odata.org/Northwind/Northwind.svc/", true);
        this.getView().setModel(oModel);
    },

    onSearch: function(oEvt) {

        // add filter for search
        var aFilters = [];
        var sQuery = oEvt.getSource().getValue();
        if (sQuery && sQuery.length > 0) {
            var filter = new sap.ui.model.Filter("ProductName", sap.ui.model.FilterOperator.Contains, sQuery);
            aFilters.push(filter);
        }

        // update list binding
        var oTable = this.getView().byId("idProductsTable");
        var binding = oTable.getBinding("items");
        binding.filter(aFilters, "Application");
    },

    onMonsterSelected: function(oEvent) {
        console.log('onMonsterSelected ' + oEvent.getSource().getBindingContextPath());
        if (this._monsterDetailDialog === undefined) {
            this._monsterDetailDialog = new sap.ui.xmlfragment("monster.demo.MonsterDetail", this);
            this._monsterDetailDialog.setModel(this.getView().getModel());
        }
        this._monsterDetailDialog.open();
        this._monsterDetailDialog.bindElement({
            path: oEvent.getSource().getBindingContextPath(),
            parameters: {
                expand: 'Supplier'
            }
        });
    },

    onMosterDetailDialogCancel: function(oEvent) {
        this._monsterDetailDialog.close();
    },

    onMosterDelete: function(oEvent) {
        var oModel = this.getView().getModel();
        var oPath = oEvent.getSource().getBindingContext().getPath();

        oModel.remove(oPath, {
            sucess: this._monsterDeleteSuccess,
            error: this._monsterDeleteError
        });
    },

    _monsterDeleteSuccess: function(oEvent) {
        this.onMonsterDetailDialogCancel();
        sap.m.MessageToast.show('Deleted', {
            duration: 5000,
            my: 'center center',
            at: 'center center'
        });
    },

    _monsterDeleteError: function(oEvent) {
        var oResponse = JSON.parse(oEvent.response.body);
        if (oResponse.error.message) {
            sap.m.MessageBox.alert(oResponse.error.message.value);
        } else {
            sap.m.MessageBox.alert('An Unknown Error Detected');
        }
    },

    myFormatter: function(value) {
        console.log('myFormatter');
        return value+' each';
    }

});