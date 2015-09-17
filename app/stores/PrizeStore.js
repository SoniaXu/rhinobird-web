'use strict';
import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/ActivityConstants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import ActivityConstants from '../constants/ActivityConstants';

let _prizes = [];
let _prize = {};

function _addPrize(prize) {

}
function _updatePrize(prize) {
    let index = _prizes.findIndex(p => p.id === prize.id);
    _prizes[index] = prize;
}
function _deletePrize(id) {
    _prizes = _prizes.filter(p => p.id !== id);
}

let PrizeStore = assign({}, BaseStore, {

    getPrizes() {
        return _prizes;
    },
    getPrize() {
        return _prize;
    },
    dispatcherIndex: AppDispatcher.register(function (payload) {
        let data = payload.data;
        let changed = true;

        switch (payload.type) {
            case Constants.ActionTypes.PRIZES_UPDATE:
                 _prizes = data;
                break;
            case Constants.ActionTypes.RECEIVE_PRIZE:
                _prize = data;
                break;
            case Constants.ActionTypes.CREATE_PRIZE:
                break;
            case Constants.ActionTypes.DELETE_PRIZE:
                _deletePrize(data);
                break;
            case Constants.ActionTypes.UPDATE_PRIZE:
                break;
            case Constants.ActionTypes.EXCHANGE_PRIZE:
                _updatePrize(data);
                break;
            default:
                changed = false;
                break;
        }

        if (changed) {
            PrizeStore.emitChange();
        }
    })

});

module.exports = PrizeStore;
