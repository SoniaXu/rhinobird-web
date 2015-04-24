'use strict';
import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/AppConstants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let _channels = {
  publicGroupChannels: [],
  directMessageChannels: []
};


let ChannelStore = assign({}, BaseStore, {

  getAllChannels() {
    return _channels;
  },

  getChannelById(_channelId) {
    console.log('not implement yet');
  },

  dispatcherIndex: AppDispatcher.register(function (payload) {
    let action = payload.action;
    switch (action.type) {
      case Constants.ChannelActionTypes.RECEIVE_ALL:
        _channels.publicGroupChannels = action.teams.publicGroupChannels;
        _channels.directMessageChannels = action.teams.directMessageChannels;
        ChannelStore.emitChange();
        break;
      default:
        break;
    }
  })

});

export default ChannelStore;