jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
sap.ui.core.mvc.Controller.extend("monster.MonsterDetail", {

    onNavButtonPress: function(oEvent) {
        app.back();
    },

    onMonsterDelete: function(oEvent) {
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
        this.onCancel();
    },

    _monsterDeleteError: function(oEvent) {
        var oResponse = JSON.parse(oEvent.response.body);
        if (oResponse.error.message) {
            sap.m.MessageBox.alert(oResponse.error.message.value);
        } else {
            sap.m.MessageBox.alert('An Unknown Error Detected');
        }
    }

});