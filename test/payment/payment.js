document.addEventListener('DOMContentLoaded', function () {
	// BootPay.setLogLevel(4);
	// BootPay.setMode('development');
	// // BootPay.useOnestoreApi();
	// BootPay.startTrace({
	// 	items: [
	// 		{
	// 			item_name: '아이템1',
	// 			item_img: 'https://www.bootpay.co.kr/sdklflksjdflkj',
	// 			unique: '1',
	// 			cat1: '카1',
	// 			cat2: '카2',
	// 			cat3: '카3'
	// 		},
	// 		{
	// 			item_name: '아이템2',
	// 			item_img: 'https://www.bootpay.co.kr/sdklflksjdflkj',
	// 			unique: '2',
	// 			cat1: '카1',
	// 			cat2: '카2',
	// 			cat3: '카3',
	// 		}
	// 	]
	// });
	// $.ajax({
	// 	url: 'https://dev-admin.bootpay.co.kr/test/user_token.json',
	// 	method: 'GET',
	// 	success: function (response) {
	// 		document.getElementsByName('user_token')[0].value = response.data.user_token
	// 	}
	// });
	// document.getElementsByName('pg')[0].value = 'toss';
	// document.getElementsByName('method')[0].value = 'card';
	// document.getElementsByName('price')[0].value = 1000;
});

// function doModal() {
// 	$('#modal').modal('show', {
// 		backdrop: 'static',
// 		keyboard: false
// 	});
// }
//
// function doPayment() {
// 	$.ajax({
// 		url: 'https://dev-admin.bootpay.co.kr/test/user_token.json',
// 		method: 'GET',
// 		success: function (response) {
// 			document.getElementsByName('user_token')[0].value = response.data.user_token
// 			BootPay.request({
// 				price: document.getElementsByName('price')[0].value,
// 				tax_free: document.getElementsByName('tax_free')[0].value,
// 				application_id: '59a568d3e13f3336c21bf707',
// 				name: '테스트 아이템',
// 				order_id: (new Date()).getTime(),
// 				pg: document.getElementsByName('pg')[0].value,
// 				method: document.getElementsByName('method')[0].value,
// 				show_agree_window: false,
// 				use_order_id: true,
// 				escrow: true,
// 				return_url: 'https://dev-app.bootpay.co.kr/test',
// 				user_token: document.getElementsByName('user_token')[0].value,
// 				// account_expire_at: '2020-07-30 13:50:02',
// 				items: [
// 					{
// 						item_name: '테스트 아이템2',
// 						qty: 1,
// 						unique: '1234',
// 						price: 3000
// 					}
// 				],
// 				user_info: {
// 					username: '홍길동',
// 					email: 'test.bootpay.co.kr@gmail.com',
// 					addr: '인천광역시 남동구',
// 					phone: '01000000000'
// 				},
// 				extra: {
// 					expire_month: '36',
// 					// vbank_result: false,
// 					// quota: '0,2,3,4,5,6,7,8,9,10,11,12',
// 					phone_carrier: 'SKT',
// 					// escrow: true,
// 					is_done_close: false,
// 					// samsungpay: true,
// 					// offer_period: '20190620-20190630',
// 					subscribe_test_payment: true,
// 					expire_after_closed: true,
// 					disp_cash_result: 'Y',
// 					// offer_period: '월마다 한번 결제',
// 					theme: 'custom',
// 					custom_background: '#333',
// 					custom_font_color: '#fff',
// 					escrow: true,
// 					// old_certificate: true,
// 					// locale: 'en',
// 					// use_able_card: ['11', '31', '41'],
// 					disable_agree: true,
// 					seller_name: '새로운 사람',
// 					onestore: {ad_id: 'ad__id', sim_operator: 'sim__op', installer_package_name: 'installer__pn'},
// 					// offer_period: '20200701:20201010',
// 					// popup: true,
// 					// quick_popup: true,
// 					// kcp_escrow_mode: 'Y'
// 					// cash_result: false
// 					// theme: 'red',
// 					// popup: document.getElementsByName('method')[0].value === 'npay' || (document.getElementsByName('pg')[0].value === 'nicepay' && document.getElementsByName('method')[0].value === 'card' )
// 					// popup: BootPay.isMobileSafari()
// 				}
// 			}).error(function (data) {
// 				var msg = "결제 에러입니다.: " + JSON.stringify(data)
// 				alert(msg);
// 				console.log(data);
// 			}).cancel(function (data) {
// 				var msg = "결제 취소입니다.: " + JSON.stringify(data)
// 				console.log('취소!!!');
// 				alert(msg);
// 				console.log(data);
// 			}).confirm(function (data) {
// 				// this.transactionConfirm(data);
// 				if (confirm('결제를 정말 승인할까요?')) {
// 					console.log("do confirm data: " + JSON.stringify(data));
// 					BootPay.transactionConfirm(data);
// 				} else {
// 					var msg = "결제가 승인거절되었습니다.: " + JSON.stringify(data)
// 					alert(msg);
// 					console.log(data);
// 				}
// 			}).done(function (data) {
// 				alert("결제가 완료되었습니다.");
// 				console.log(data);
// 			}).ready(function (data) {
// 				console.log(data);
// 			}).close(function () {
// 				alert('닫힘!!');
// 			});
// 		}
// 	});
// }
//
// function doAsyncPayment() {
// 	BootPay.popupAsyncRequest(true, function () {
// 		return new Promise(function (resolve, reject) {
// 			setTimeout(function () {
// 				$.ajax({
// 					url: 'https://dev-admin.bootpay.co.kr/test/user_token.json',
// 					method: 'GET',
// 					success: function (response) {
// 						document.getElementsByName('user_token')[0].value = response.data.user_token
// 						resolve({
// 							price: document.getElementsByName('price')[0].value,
// 							tax_free: document.getElementsByName('tax_free')[0].value,
// 							application_id: '59a568d3e13f3336c21bf707',
// 							name: '테스트 아이템',
// 							phone: '01000000000',
// 							order_id: (new Date()).getTime(),
// 							pg: document.getElementsByName('pg')[0].value,
// 							method: document.getElementsByName('method')[0].value,
// 							show_agree_window: false,
// 							use_order_id: true,
// 							escrow: true,
// 							return_url: 'https://dev-app.bootpay.co.kr/test',
// 							user_token: document.getElementsByName('user_token')[0].value,
// 							// account_expire_at: '2020-07-30 13:50:02',
// 							items: [
// 								{
// 									item_name: '테스트 아이템2',
// 									qty: 1,
// 									unique: '1234',
// 									price: 3000
// 								}
// 							],
// 							user_info: {
// 								username: '홍길동',
// 								email: 'test.bootpay.co.kr@gmail.com',
// 								addr: '인천광역시 남동구',
// 								phone: '01095735114'
// 							},
// 							extra: {
// 								expire_month: '36',
// 								// vbank_result: false,
// 								// quota: '0,2,3,4,5,6,7,8,9,10,11,12',
// 								phone_carrier: 'SKT',
// 								// escrow: true,
// 								is_done_close: false,
// 								// samsungpay: true,
// 								// offer_period: '20190620-20190630',
// 								subscribe_test_payment: true,
// 								expire_after_closed: true,
// 								disp_cash_result: 'Y',
// 								// offer_period: '월마다 한번 결제',
// 								theme: 'custom',
// 								custom_background: '#333',
// 								custom_font_color: '#fff',
// 								// escrow: true,
// 								// old_certificate: true,
// 								// locale: 'en',
// 								// use_able_card: ['11', '31', '41'],
// 								disable_agree: true,
// 								seller_name: '새로운 사람',
// 								onestore: {
// 									ad_id: 'ad__id',
// 									sim_operator: 'sim__op',
// 									installer_package_name: 'installer__pn'
// 								},
// 								offer_period: '20200701:20201010',
// 								// popup: true,
// 								// quick_popup: true,
// 								// kcp_escrow_mode: 'Y'
// 								// cash_result: false
// 								// theme: 'red',
// 								// popup: document.getElementsByName('method')[0].value === 'npay' || (document.getElementsByName('pg')[0].value === 'nicepay' && document.getElementsByName('method')[0].value === 'card' )
// 								// popup: BootPay.isMobileSafari()
// 							}
// 						});
// 					}
// 				});
//
// 			}, 100);
// 		});
// 	}).error(function (data) {
// 		var msg = "결제 에러입니다.: " + JSON.stringify(data)
// 		alert(msg);
// 		console.log(data);
// 	}).cancel(function (data) {
// 		var msg = "결제 취소입니다.: " + JSON.stringify(data)
// 		console.log('취소!!!');
// 		alert(msg);
// 		console.log(data);
// 	}).confirm(function (data) {
// 		// this.transactionConfirm(data);
// 		if (confirm('결제를 정말 승인할까요?')) {
// 			console.log("do confirm data: " + JSON.stringify(data));
// 			BootPay.transactionConfirm(data);
// 		} else {
// 			var msg = "결제가 승인거절되었습니다.: " + JSON.stringify(data)
// 			alert(msg);
// 			console.log(data);
// 		}
// 	}).done(function (data) {
// 		alert("결제가 완료되었습니다.");
// 		console.log(data);
// 	}).ready(function (data) {
// 		console.log(data);
// 	}).close(function () {
// 		alert('닫힘!!');
// 	});
//
// }
//
// function doAsyncAllPayment() {
// 	BootPay.popupAsyncRequest(BootPay.isMobile(), function () {
// 		return new Promise(function (resolve, reject) {
// 			resolve({
// 				price: document.getElementsByName('price')[0].value,
// 				tax_free: document.getElementsByName('tax_free')[0].value,
// 				application_id: '59a568d3e13f3336c21bf707',
// 				name: "테스트's 아이템",
// 				phone: '01000000000',
// 				order_id: (new Date()).getTime(),
// 				show_agree_window: true,
// 				items: [
// 					{
// 						item_name: '테스트 아이템',
// 						qty: 1,
// 						unique: '123',
// 						price: 1000
// 					}
// 				],
// 				user_info: {
// 					email: 'test.bootpay.co.kr@gmail.com'
// 				},
// 				user_token: document.getElementsByName('user_token')[0].value,
// 				extra: {
// 					expire_month: '36',
// 					vbank_result: false
// 					// theme: 'red',
// 					// theme: 'custom',
// 					// custom_background: '#00a086',
// 					// custom_font_color: '#fff'
// 				}
// 			});
// 		});
// 	}).error(function (data) {
// 		var msg = "결제 에러입니다.: " + JSON.stringify(data)
// 		alert(msg);
// 		console.log(data);
// 	}).cancel(function (data) {
// 		var msg = "결제 취소입니다.: " + JSON.stringify(data)
// 		alert(msg);
// 		console.log(data);
// 	}).confirm(function (data) {
// 		if (confirm('결제를 정말 승인할까요?')) {
// 			console.log("do confirm data: " + JSON.stringify(data));
// 			this.transactionConfirm(data);
// 		} else {
// 			var msg = "결제가 승인거절되었습니다.: " + JSON.stringify(data);
// 			alert(msg);
// 			console.log(data);
// 		}
// 	}).done(function (data) {
// 		alert("결제가 완료되었습니다.");
// 		console.log(data);
// 	}).ready(function (data) {
// 		console.log(data);
// 		alert('계좌발급완료');
// 	});
// }
//
// function doAllPayment() {
// 	BootPay.request({
// 		price: document.getElementsByName('price')[0].value,
// 		tax_free: document.getElementsByName('tax_free')[0].value,
// 		application_id: '59a568d3e13f3336c21bf707',
// 		name: "테스트's 아이템",
// 		phone: '01000000000',
// 		order_id: (new Date()).getTime(),
// 		show_agree_window: true,
// 		items: [
// 			{
// 				item_name: '테스트 아이템',
// 				qty: 1,
// 				unique: '123',
// 				price: 1000
// 			}
// 		],
// 		user_info: {
// 			email: 'test.bootpay.co.kr@gmail.com'
// 		},
// 		user_token: document.getElementsByName('user_token')[0].value,
// 		extra: {
// 			expire_month: '36',
// 			// theme: 'red',
// 			// theme: 'custom',
// 			// custom_background: '#00a086',
// 			// custom_font_color: '#fff'
// 		}
// 	}).error(function (data) {
// 		var msg = "결제 에러입니다.: " + JSON.stringify(data)
// 		alert(msg);
// 		console.log(data);
// 	}).cancel(function (data) {
// 		var msg = "결제 취소입니다.: " + JSON.stringify(data)
// 		alert(msg);
// 		console.log(data);
// 	}).confirm(function (data) {
// 		if (confirm('결제를 정말 승인할까요?')) {
// 			console.log("do confirm data: " + JSON.stringify(data));
// 			this.transactionConfirm(data);
// 		} else {
// 			var msg = "결제가 승인거절되었습니다.: " + JSON.stringify(data);
// 			alert(msg);
// 			console.log(data);
// 		}
// 	}).done(function (data) {
// 		alert("결제가 완료되었습니다.");
// 		console.log(data);
// 	}).ready(function (data) {
// 		console.log(data);
// 	});
// }
//
// function changeMethod(e) {
// 	switch (e.value) {
// 		case 'card_rebill':
// 			document.getElementsByName('price')[0].value = 0;
// 			break;
// 		case 'auth':
// 			document.getElementsByName('price')[0].value = 0;
// 			break;
// 		case 'digital_card_rebill':
// 			document.getElementsByName('price')[0].value = 0;
// 			break;
// 		default:
// 			document.getElementsByName('price')[0].value = 3000;
// 	}
// }
//
// function doUserVerification() {
// 	BootPay.verifyPassword({
// 		userToken: document.getElementsByName('user_token')[0].value,
// 		deviceId: 'test',
// 		message: '생체인식 정보를 등록합니다.'
// 	}).easyCancel(function (data) {
// 		console.log(data);
// 	}).easyError(function (data) {
// 		console.log(data);
// 	}).easySuccess(function (data) {
// 		console.log(data);
// 		alert("성공: " + data.data.token);
// 	});
// }
//
// function doRegisterCard() {
// 	BootPay.registerCard({
// 		userToken: document.getElementsByName('user_token')[0].value,
// 		deviceId: 'test'
// 	}).easyCancel(function (data) {
// 		console.log(data);
// 	}).easyError(function (data) {
// 		console.log(data);
// 	}).easySuccess(function (data) {
// 		console.log(data);
// 		alert("카드 등록 성공: " + data.data);
// 	});
// }
//
// function doChangePassword() {
// 	BootPay.changePassword({
// 		userToken: document.getElementsByName('user_token')[0].value,
// 		deviceId: 'test',
// 	}).easyCancel(function (data) {
// 		console.log(data);
// 	}).easyError(function (data) {
// 		console.log(data);
// 	}).easySuccess(function (data) {
// 		console.log(data);
// 		alert("비밀번호 변경 성공: " + data.data);
// 	});
// }

// const doRegisterCard = () => {
// 	BootPay
// }