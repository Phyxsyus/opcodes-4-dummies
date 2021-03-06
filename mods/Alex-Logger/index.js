const hexy = require('hexy')
const { protocol } = require('tera-data-parser')
protocol.load(require.resolve('tera-data'))

module.exports = function AlexLogger(dispatch) {
	const startTime = Date.now()
	
	let logC = false
	let logS = false
	let logRaw = true
	let logRawUnkOnly = true
	let logJson = true
	let logUnk = true
	let logUnkOnly = false
	let logPaste = false
	
	let searchExpr = null

	let blacklist = [
'C_ADD_FRIEND',
'C_ADD_TELEPORT_TO_POS_LIST',
'C_ADMIN',
'C_APPLY_PARTY',
'C_ASK_INTERACTIVE',
'C_BAN_PARTY_MEMBER',
'C_BIND_ITEM_BEGIN_PROGRESS',
'C_BIND_ITEM_EXECUTE',
'C_BLOCK_USER',
'C_CANCEL_CHANGE_USER_APPEARANCE',
'C_CANCEL_CONTRACT',
'C_CANCEL_SKILL',
'C_CAN_LOCKON_TARGET',
'C_CHANGE_PARTY_MANAGER',
'C_CHANGE_PARTY_MEMBER_AUTHORITY',
'C_CHAT',
'C_CHECK_VERSION',
'C_COMMIT_CHANGE_USER_APPEARANCE',
'C_COMPLETE_DAILY_EVENT',
'C_COMPLETE_EXTRA_EVENT',
'C_CONFIRM_UPDATE_NOTIFICATION',
'C_CREST_APPLY',
'C_CREST_APPLY_LIST',
'C_DELETE_FRIEND',
'C_DELETE_PARCEL',
'C_DELETE_TELEPORT_TO_POS_LIST',
'C_DEL_ITEM',
'C_DIALOG',
'C_DISMISS_PARTY',
'C_EDIT_BLOCKED_USER_MEMO',
'C_END_CLIMBING',
'C_END_MOVIE',
'C_GACHA_TRY',
'C_GET_IN_SHUTTLE',
'C_GET_OUT_SHUTTLE',
'C_GET_USER_LIST',
'C_HIT_USER_PROJECTILE',
'C_INVITE_USER_TO_GUILD',
'C_ITEM_COLORING_SET_COLOR',
'C_LEAVE_PARTY',
'C_LEAVE_PRIVATE_CHANNEL',
'C_LIST_PARCEL',
'C_LOAD_TOPO_FIN',
'C_LOGIN_ARBITER',
'C_MERGE_ITEM',
'C_MERGE_ITEM_EXECUTE',
'C_NOTIFY_LOCATION_IN_ACTION',
'C_NOTIFY_LOCATION_IN_DASH',
'C_NOTIMELINE_SKILL',
'C_NPC_CONTACT',
'C_OP_COMMAND',
'C_PARTY_APPLICATION_DENIED',
'C_PARTY_MARKER',
'C_PARTY_MATCH_WINDOW_CLOSED',
'C_PCBANGINVENTORY_USE_SLOT',
'C_PLAYER_FLYING_LOCATION',
'C_PLAYER_LOCATION',
'C_PREMIUM_SLOT_USE_SLOT',
'C_PRESS_SKILL',
'C_RECV_PARCEL',
'C_REGISTER_ENCHANT_ITEM',
'C_REGISTER_EVOLUTION_ITEM',
'C_REGISTER_PARTY_INFO',
'C_REMOVE_BLOCKED_USER',
'C_REPLY_THROUGH_ARBITER_CONTRACT',
'C_REQUEST_CANDIDATE_LIST',
'C_REQUEST_CONTRACT',
'C_REQUEST_ENCHANT',
'C_REQUEST_EVOLUTION',
'C_REQUEST_GAMESTAT_PING',
'C_REQUEST_NONDB_ITEM_INFO',
'C_REQUEST_PARTY_INFO',
'C_REQUEST_PARTY_MATCH_INFO',
'C_REQUEST_PARTY_MATCH_INFO_PAGE',
'C_REQUEST_PARTY_MATCH_LINK',
'C_REQUEST_PRIVATE_CHANNEL_INFO',
'C_REQUEST_USER_PAPERDOLL_INFO',
'C_RESET_ALL_DUNGEON',
'C_RETURN_TO_LOBBY',
'C_REVIVE_NOW',
'C_RQ_COMMIT_DECOMPOSITION_CONTRACT',
'C_RQ_START_SOCIAL_ON_PROGRESS_DECOMPOSITION',
'C_SAVE_CLIENT_ACCOUNT_SETTING',
'C_SAVE_CLIENT_USER_SETTING',
'C_SECOND_PASSWORD_AUTH',
'C_SELECT_USER',
'C_SET_VISIBLE_RANGE',
'C_SHOW_INVEN',
'C_SHOW_ITEM_TOOLTIP_EX',
'C_SHOW_PARCEL_MESSAGE',
'C_SOCIAL',
'C_START_COMBO_INSTANT_SKILL',
'C_START_ENCHANT',
'C_START_EVOLUTION',
'C_START_INSTANCE_SKILL',
'C_START_INSTANCE_SKILL_EX',
'C_START_PRODUCE',
'C_START_SKILL',
'C_START_TARGETED_SKILL',
'C_TELEPORT_TO_POS',
'C_TELEPORT_TO_VILLAGE',
'C_TRADE_BROKER_BUY_IT_NOW',
'C_TRADE_BROKER_DEAL_CONFIRM',
'C_TRADE_BROKER_REJECT_SUGGEST',
'C_TRADE_BROKER_SUGGEST_DEAL',
'C_TRADE_BROKER_WAITING_ITEM_LIST_NEW',
'C_TRADE_BROKER_WAITING_ITEM_LIST_PAGE',
'C_TRY_LOOT_DROPITEM',
'C_UNMOUNT_VEHICLE',
'C_UNREGISTER_ENCHANT_ITEM',
'C_UNREGISTER_EVOLUTION_ITEM',
'C_UNREGISTER_PARTY_INFO',
'C_UPDATE_REACTION_POS',
'C_USE_ITEM',
'C_VIEW_WARE',
'C_VISIT_NEW_SECTION',
'C_WHISPER',
'S_ABNORMALITY_BEGIN',
'S_ABNORMALITY_DAMAGE_ABSORB',
'S_ABNORMALITY_END',
'S_ABNORMALITY_FAIL',
'S_ABNORMALITY_REFRESH',
'S_ACCEPT_CONTRACT',
'S_ACCOMPLISH_ACHIEVEMENT',
'S_ACCOUNT_PACKAGE_LIST',
'S_ACTION_END',
'S_ACTION_STAGE',
'S_ADD_BLOCKED_USER',
'S_ADD_INTER_PARTY_MATCH_POOL',
'S_ADMIN_HOLD_CHARACTER',
'S_AERO',
'S_AIR_REACTION_END',
'S_ANNOUNCE_UPDATE_NOTIFICATION',
'S_ANSWER_INTERACTIVE',
'S_APPLY_TITLE',
'S_AVAILABLE_EVENT_MATCHING_LIST',
'S_AVAILABLE_SOCIAL_LIST',
'S_BAN_PARTY',
'S_BAN_PARTY_MEMBER',
'S_BATTLE_FIELD_ENTRANCE_INFO',
'S_BATTLE_FIELD_POINT_STORE_SELL_LIST',
'S_BEGIN_THROUGH_ARBITER_CONTRACT',
'S_BOSS_GAGE_INFO',
'S_CANCEL_CONTRACT',
'S_CANNOT_START_SKILL',
'S_CAN_LOCKON_TARGET',
'S_CHANGE_DESTPOS_PROJECTILE',
'S_CHANGE_EP_EXP_DAILY_LIMIT',
'S_CHANGE_EP_POINT',
'S_CHANGE_EVENT_MATCHING_STATE',
'S_CHANGE_GUILD_CHIEF',
'S_CHANGE_PARTY_MANAGER',
'S_CHANGE_VOICE_USE_QAC',
'S_CHAT',
'S_CHECK_TO_READY_PARTY',
'S_CHECK_TO_READY_PARTY_FIN',
'S_CHECK_VERSION',
'S_CLEAR_ALL_HOLDED_ABNORMALITY',
'S_COLLECTION_PICKEND',
'S_COLLECTION_PICKSTART',
'S_COMPLETE_EVENT_MATCHING_QUEST',
'S_CONNECT_SKILL_ARROW',
'S_CREATURE_CHANGE_HP',
'S_CREATURE_LIFE',
'S_CREATURE_ROTATE',
'S_CREST_APPLY',
'S_CREST_INFO',
'S_CREST_MESSAGE',
'S_CURRENT_CHANNEL',
'S_CUSTOM_STYLE_SYSTEM_MESSAGE',
'S_DEAD_LOCATION',
'S_DECREASE_COOLTIME_SKILL',
'S_DEFEND_SUCCESS',
'S_DESPAWN_BONFIRE',
'S_DESPAWN_BUILD_OBJECT',
'S_DESPAWN_COLLECTION',
'S_DESPAWN_DROPITEM',
'S_DESPAWN_NPC',
'S_DESPAWN_PROJECTILE',
'S_DESPAWN_SHUTTLE',
'S_DESPAWN_USER',
'S_DESTROY_GUILD_TOWER',
'S_DIALOG',
'S_DUNGEON_CAMERA_SET',
'S_DUNGEON_CLEAR_COUNT_LIST',
'S_DUNGEON_COOL_TIME_LIST',
'S_DUNGEON_EVENT_MESSAGE',
'S_EACH_SKILL_RESULT',
'S_ENABLE_DISABLE_SELLABLE_ITEM_LIST',
'S_END_CHANGE_USER_APPEARANCE',
'S_END_PRODUCE',
'S_END_USER_PROJECTILE',
'S_EP_SYSTEM_DAILY_EVENT_EXP_ON_OFF',
'S_EXIT',
'S_F2P_PremiumUser_Permission',
'S_FEARMOVE_END',
'S_FEARMOVE_STAGE',
'S_FIELD_EVENT_ON_ENTER',
'S_FIELD_EVENT_ON_LEAVE',
'S_FIELD_POINT_INFO',
'S_FIN_INTER_PARTY_MATCH',
'S_FONT_SWAP_INFO',
'S_FRIEND_LIST',
'S_GACHA_END',
'S_GACHA_START',
'S_GET_IN_SHUTTLE',
'S_GET_OUT_SHUTTLE',
'S_GET_USER_GUILD_LOGO',
'S_GET_USER_LIST',
'S_GMEVENT_GUIDE_MESSAGE',
'S_GMEVENT_OX_QUIZ_OPEN',
'S_GMEVENT_OX_QUIZ_RESULT',
'S_GMEVENT_RECV_REWARD',
'S_GRANT_SKILL',
'S_GROUP_NPC_LOCATION',
'S_GUILD_MEMBER_LIST',
'S_GUILD_NAME',
'S_GUILD_STORE_SELL_LIST',
'S_GUILD_TOWER_INFO',
'S_HOLD_ABNORMALITY_ADD',
'S_IMAGE_DATA',
'S_INSTANT_DASH',
'S_INSTANT_MOVE',
'S_INVEN',
'S_INVEN_CHANGEDSLOT',
'S_ITEM_COLORING_BAG',
'S_ITEM_CUSTOM_STRING',
'S_JOIN_PRIVATE_CHANNEL',
'S_LEARN_EP_PERK',
'S_LEAVE_PARTY',
'S_LEAVE_PARTY_MEMBER',
'S_LEAVE_PRIVATE_CHANNEL',
'S_LIST_PARCEL_EX',
'S_LOADING_SCREEN_CONTROL_INFO',
'S_LOAD_ACHIEVEMENT_LIST',
'S_LOAD_CLIENT_ACCOUNT_SETTING',
'S_LOAD_CLIENT_USER_SETTING',
'S_LOAD_DUNGEON_SOUND_HINT',
'S_LOAD_EP_INFO',
'S_LOAD_TELEPORT_TO_POS_LIST',
'S_LOAD_TOPO',
'S_LOGIN',
'S_LOGIN_ACCOUNT_INFO',
'S_LOGOUT_PARTY_MEMBER',
'S_MOUNT_VEHICLE',
'S_MOUNT_VEHICLE_EX',
'S_MOVE_SHUTTLE',
'S_NOCTAN_VARIATION_INFO',
'S_NOTIFY_GUILD_QUEST_URGENT',
'S_NOTIFY_TO_FRIENDS_WALK_INTO_SAME_AREA',
'S_NPC_CHANGE_MESH',
'S_NPC_LOCATION',
'S_NPC_MENU_SELECT',
'S_NPC_OCCUPIER_INFO',
'S_NPC_STATUS',
'S_NPC_TARGET_USER',
'S_OPEN_AWESOMIUM_WEB_URL',
'S_OTHER_USER_APPLY_PARTY',
'S_PARCEL_READ_RECV_STATUS',
'S_PARTY_INFO',
'S_PARTY_MARKER',
'S_PARTY_MATCH_LINK',
'S_PARTY_MEMBER_ABNORMAL_ADD',
'S_PARTY_MEMBER_ABNORMAL_CLEAR',
'S_PARTY_MEMBER_ABNORMAL_DEL',
'S_PARTY_MEMBER_ABNORMAL_REFRESH',
'S_PARTY_MEMBER_BUFF_UPDATE',
'S_PARTY_MEMBER_CHANGE_HP',
'S_PARTY_MEMBER_CHANGE_MP',
'S_PARTY_MEMBER_INFO',
'S_PARTY_MEMBER_INTERVAL_POS_UPDATE',
'S_PARTY_MEMBER_LIST',
'S_PARTY_MEMBER_QUEST_DATA',
'S_PARTY_MEMBER_STAT_UPDATE',
'S_PCBANGINVENTORY_DATALIST',
'S_PLAYER_CHANGE_ALL_PROF',
'S_PLAYER_CHANGE_EP',
'S_PLAYER_CHANGE_EXP',
'S_PLAYER_CHANGE_FLIGHT_ENERGY',
'S_PLAYER_CHANGE_MP',
'S_PLAYER_CHANGE_PROF',
'S_PLAYER_CHANGE_STAMINA',
'S_PLAYER_RESET_EP',
'S_PLAYER_STAT_UPDATE',
'S_PLAY_ANIMATION',
'S_PLAY_EFFECT',
'S_PLAY_MOVIE',
'S_PLAY_SOUND',
'S_POINT_STORE_SELL_LIST',
'S_PREMIUM_SLOT_DATALIST',
'S_PREMIUM_SLOT_OFF',
'S_PREPARE_EXIT',
'S_PREPARE_RETURN_TO_LOBBY',
'S_PREVIEW_ITEM',
'S_PRIVATE_CHAT',
'S_PRODUCE_CRITICAL',
'S_QUEST_BALLOON',
'S_QUEST_INFO',
'S_QUEST_VILLAGER_INFO',
'S_RECV_PARCEL',
'S_REGISTER_ENCHANT_ITEM',
'S_REGISTER_EVOLUTION_ITEM',
'S_REJECT_CONTRACT',
'S_REMOVE_BLOCKED_USER',
'S_REMOVE_EFFECT',
'S_REPLY_NONDB_ITEM_INFO',
'S_REPLY_REQUEST_CONTRACT',
'S_REQUEST_CITY_WAR_MAP_INFO',
'S_REQUEST_CITY_WAR_MAP_INFO_DETAIL',
'S_REQUEST_CITY_WAR_MAP_INFO_END',
'S_REQUEST_CONTRACT',
'S_REQUEST_PRIVATE_CHANNEL_INFO',
'S_REQUEST_REACTION_POS_TICK',
'S_REQUEST_SECOND_PASSWORD_AUTH',
'S_REQUEST_STYLE_SHOP_MARK_PRODUCTLIST',
'S_RESET_EP_PERK',
'S_RESPONSE_GAMESTAT_PONG',
'S_RESULT_BIDDING_DICE_THROW',
'S_RESULT_ITEM_BIDDING',
'S_RETURN_TO_LOBBY',
'S_SHORTCUT_CHANGE',
'S_SHOW_AWESOMIUMWEB_SHOP',
'S_SHOW_CANDIDATE_LIST',
'S_SHOW_HP',
'S_SHOW_ITEM_TOOLTIP',
'S_SHOW_PARTY_MATCH_INFO',
'S_SHOW_PCBANG_ICON',
'S_SHOW_PEGASUS_MAP',
'S_SHOW_USER_EP_INFO',
'S_SKILL_ATTENTION_TARGET',
'S_SKILL_CATEGORY',
'S_SKILL_LIST',
'S_SOCIAL',
'S_SPAWN_BONFIRE',
'S_SPAWN_BUILD_OBJECT',
'S_SPAWN_COLLECTION',
'S_SPAWN_DOOR',
'S_SPAWN_DROPITEM',
'S_SPAWN_ME',
'S_SPAWN_NPC',
'S_SPAWN_PROJECTILE',
'S_SPAWN_SHUTTLE',
'S_SPAWN_USER',
'S_SPAWN_WORKOBJECT',
'S_START_ACTION_SCRIPT',
'S_START_CHANGE_USER_APPEARANCE',
'S_START_CLIENT_CUSTOM_SKILL',
'S_START_CLIMBING',
'S_START_COOLTIME_ITEM',
'S_START_COOLTIME_SKILL',
'S_START_INVERSE_CAPTURE',
'S_START_PRODUCE',
'S_START_USER_PROJECTILE',
'S_STICK_TO_USER_END',
'S_STICK_TO_USER_START',
'S_STORE_SELL_LIST',
'S_SUCCESS_COUNTER',
'S_SYSTEM_MESSAGE',
'S_SYSTEM_MESSAGE_LOOT_ITEM',
'S_SYSTEM_MESSAGE_LOOT_SPECIAL_ITEM',
'S_TARGET_INFO',
'S_TELEPORT_TO_CAMP',
'S_TRADE_BROKER_DEAL_INFO_UPDATE',
'S_TRADE_BROKER_DEAL_SUGGESTED',
'S_TRADE_BROKER_HISTORY_ITEM_LIST',
'S_TRADE_BROKER_REQUEST_DEAL_RESULT',
'S_TRADE_BROKER_SUGGEST_DEAL',
'S_TRADE_BROKER_WAITING_ITEM_LIST',
'S_UNICAST_FLOATING_CASTLE_INFO',
'S_UNICAST_FLOATING_CASTLE_NAMEPLATE',
'S_UNICAST_TRANSFORM_DATA',
'S_UNMOUNT_VEHICLE',
'S_UNMOUNT_VEHICLE_EX',
'S_UPDATE_ACHIEVEMENT_PROGRESS',
'S_UPDATE_FRIEND_INFO',
'S_UPDATE_NPCGUILD',
'S_USER_APPEARANCE_CHANGE',
'S_USER_BLOCK_LIST',
'S_USER_CHANGE_NAME',
'S_USER_DEATH',
'S_USER_EFFECT',
'S_USER_EXTERNAL_CHANGE',
'S_USER_LEVELUP',
'S_USER_LOCATION',
'S_USER_LOCATION_IN_ACTION',
'S_USER_MOVETYPE',
'S_USER_PAPERDOLL_INFO',
'S_USER_SITUATION',
'S_USER_STATUS',
'S_USER_WEAPON_APPEARANCE_CHANGE',
'S_VIEW_PARTY_INVITE',
'S_VIEW_WARE_EX',
'S_VILLAGE_LIST_TO_TELEPORT',
'S_VISIT_NEW_SECTION',
'S_VOTE_RESET_ALL_DUNGEON',
'S_WEAK_POINT',
'S_WHISPER',

'黑名单',

// 'C_END_FISHING_MINIGAME',
// 'C_RQ_ADD_ITEM_TO_DECOMPOSITION_CONTRACT',
// 'C_RQ_START_SOCIAL_ON_PROGRESS_DECOMPOSITION',
// 'C_START_FISHING_MINIGAME',
// 'S_CAST_FISHING_ROD',
// 'S_FISHING_BITE',
// 'S_START_FISHING_MINIGAME',

// 'C_BUY_VILLAGER_BUFF',
// 'C_SELECT_CHANNEL',
// 'C_TRY_NPC_INTERACTION',
// 'S_CANT_FLY_ANYMORE',
// 'S_LOCKON_YOU',
// 'S_FATIGABILITY_POINT',

// 'C_PUT_WARE_ITEM',
// 'S_FISHING_CATCH',
// 'S_FISHING_CATCH_FAIL',
// 'S_RP_ADD_ITEM_TO_DECOMPOSITION_CONTRACT'

	];
	
	dispatch.command.add('logC', () => {
		logC = !logC
		dispatch.command.message(`Client packet logging is now ${logC ? 'enabled' : 'disabled'}.`)
	});
	
	dispatch.command.add('logS', () => {
		logS = !logS;
		dispatch.command.message(`Server packet logging is now ${logS ? 'enabled' : 'disabled'}.`)
	});
	
	dispatch.command.add('logRaw', () => {
		arg = ''+arg
		arg = arg.toLowerCase()
		
		if (['true', 'yes', 'y', '1'].includes(arg)) {
			logRaw = true
			logRawUnkOnly = false
		} else if (['false', 'no', 'n', '0'].includes(arg)) {
			logRaw = false
			logRawUnkOnly = false
		} else if (['unk', 'u', '2'].includes(arg)) {
			logRaw = true
			logRawUnkOnly = true
		} else {
			logRaw = !logRaw
			logRawUnkOnly = false
		}
		
		dispatch.command.message(`Raw packet logging is now ${logRaw ? 'enabled' : 'disabled'}${logRawUnkOnly ? ' (only unknown packets)' : ''}.`)
	});
	
	dispatch.command.add('logJson', () => {
		logJson = !logJson
		dispatch.command.message(`Json packet logging is now ${logJson ? 'enabled' : 'disabled'}.`)
	});
	
	dispatch.command.add('logPaste', () => {
		logPaste = !logPaste
		dispatch.command.message(`Raw packet pasting format is now ${logPaste ? 'enabled' : 'disabled'}.`)
	});
	
	dispatch.command.add('logUnk', (arg) => {
		arg = ''+arg
		arg = arg.toLowerCase()
		
		if (['true', 'yes', 'y', '1'].includes(arg)) {
			logUnk = true
			logUnkOnly = false
		} else if (['false', 'no', 'n', '0'].includes(arg)) {
			logUnk = false
			logUnkOnly = false
		} else if (['only', 'o', '2'].includes(arg)) {
			logUnk = true
			logUnkOnly = true
		} else {
			logUnk = !logUnk
			logUnkOnly = false
		}
		
		dispatch.command.message(`Unknown packet logging is now ${logUnk ? 'enabled' : 'disabled'}${logUnkOnly ? ' (only)' : ''}.`)
	});
	
	dispatch.command.add('logSearch', (s) => {
		if (s === '' || s === undefined) s = null
		searchExpr = s;
		
		if (searchExpr !== null) {
			searchExpr = ''+searchExpr
			dispatch.command.message(`Logger search expression set to: ${searchExpr}`);
		} else {
			dispatch.command.message(`Logger search disabled.`);
		}
	});
	
	dispatch.command.add('logB', (name) => {
		if (name === null || name === undefined) {
			dispatch.command.message('Invalid');
			return
		}
		var index = blacklist.indexOf(name);
		if (index > -1) {
			blacklist.splice(index, 1);
			dispatch.command.message('Now showing '+name+'.');
		} else {
			blacklist.push(''+name);
			dispatch.command.message('Now hiding '+name+'.');
		}
	});
	
	dispatch.command.add('logBlackShow', (name) => {
		for (let item of blacklist) {
			dispatch.command.message(item)
		}
	});
	
	dispatch.command.add('logBlackClear', (name) => {
		blacklist = []
		dispatch.command.message(`Logger blacklist cleared.`)
	})
	
	function pad(n, l, c = '0') {
		return String(c).repeat(l).concat(n).slice(-l);
	}
	
	function hexDump(data) {
		if (logPaste) {
			return data.toString('hex')
		} else {
			return hexy.hexy(data)
		}
	}
	
	function timestamp() {
		return pad(Date.now() - startTime, 9, ' ')
	}
	
	function packetArrow(incoming) {
		return incoming ? '<-' : '->'
	}
	
	function printUnknown(code, data, incoming) {
		console.log(`${timestamp()} ${packetArrow(incoming)} (id ${code})`)
		if (logRaw) console.log(hexDump(data))
	}
	
	function printKnown(name, packet, incoming, code, data, defPerhapsWrong) {
		let json = JSON.stringify(packet, null, 4)
		console.log(`${timestamp()} ${packetArrow(incoming)} ${name} (id ${code}${defPerhapsWrong ? ', DEF WRONG!!!)' : ')'}`)
		if (logJson) console.log(json)
		if (logRaw && (defPerhapsWrong || !logRawUnkOnly)) console.log(hexDump(data))
	}
	
	function isDefPerhapsWrong(name, packet, incoming, data) {
		if (incoming && name.slice(0, 2) === 'C_') {
			return true
		}
		if (!incoming && name.slice(0, 2) === 'S_') {
			return true
		}
		
		let protocolVersion = dispatch.protocolVersion
		let data2 = protocol.write(protocolVersion, name, '*', packet)
		if ((data.length != data2.length) || !data.equals(data2)) {
			return true
		} else {
			return false
		}
	}
	
	function shouldPrintKnownPacket(name, code, incoming) {
		if (logUnk && logUnkOnly) return false
		
		if (incoming) {
			if (!logS) return false
		} else {
			if (!logC) return false
		}
		
		for (let item of blacklist) {
			if (item.toUpperCase() === name.toUpperCase()) {
				return false
			}
			
			if (item.toUpperCase() === (''+code)) {
				return false
			}
		}
		
		if (searchExpr !== null && !packetMatchesSearch(name, code)) {
			return false
		}
		
		return true
	}
	
	function shouldPrintUnknownPacket(code, incoming) {
		if (!logUnk) return false
		
		if (incoming) {
			if (!logS) return false
		} else {
			if (!logC) return false
		}
		
		for (let item of blacklist) {
			if (item.toUpperCase() === (''+code)) {
				return false
			}
		}
		
		if (searchExpr !== null && !packetMatchesSearch('', code)) {
			return false
		}
		
		return true
	}
	
	function packetMatchesSearch(name, code){
		if (searchExpr === (''+code)) {
			return true
		} else {
			if (name !== '' && new RegExp(searchExpr).test(name)) {
				return true
			}
		}
		
		return false
	}
	
	dispatch.hook('*', 'raw', { order: 999, type: 'all' }, (code, data, incoming, fake) => {
		if (!logC && !logS) return
		
		let protocolVersion = dispatch.protocolVersion
		let name = null
		let packet = null
		
		try {
			name = protocol.maps.get(protocolVersion).code.get(code)
		} catch(e) {
			name = null
		}
		
		if (name) {
			try {
				packet = protocol.parse(protocolVersion, code, '*', data)
			} catch(e) {
				packet = null
			}

			if (packet) {
				let defPerhapsWrong = isDefPerhapsWrong(name, packet, incoming, data)
				if (shouldPrintKnownPacket(name, code, incoming)) {
					printKnown(name, packet, incoming, code, data, defPerhapsWrong)
				}
			}
		}
		
		if (!name || !packet) {
			if (shouldPrintUnknownPacket(code, incoming)) {
				printUnknown(code, data, incoming)
			}
		}
	})
	
};
