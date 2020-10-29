document.addEventListener('DOMContentLoaded', function () {
	BootPay.setLogLevel(4);
	BootPay.setMode('stage');
	// BootPay.setMode('production');
	BootPay.startTrace({
		items: [
			{
				item_name: '아이템1',
				item_img: 'https://www.bootpay.co.kr/sdklflksjdflkj',
				unique: '1',
				cat1: '카1',
				cat2: '카2',
				cat3: '카3'
			},
			{
				item_name: '아이템2',
				item_img: 'https://www.bootpay.co.kr/sdklflksjdflkj',
				unique: '2',
				cat1: '카1',
				cat2: '카2',
				cat3: '카3'
			}
		]
	});
	$.ajax({
		url: 'https://stage-admin.bootpay.co.kr/test/user_token.json',
		method: 'GET',
		success: function (response) {
			document.getElementsByName('user_token')[0].value = response.data.user_token
		}
	});
	document.getElementsByName('pg')[0].value = 'kcp';
	document.getElementsByName('method')[0].value = 'card';
	document.getElementsByName('price')[0].value = 1000;
});

function doPayment() {
	BootPay.request({
		price: document.getElementsByName('price')[0].value,
		tax_free: document.getElementsByName('tax_free')[0].value,
		application_id: '59a7a368396fa64fc5d4a7db',
		name: '테스트 아이템%@@',
		phone: '01000000000',
		return_url: 'https://dev-app.bootpay.co.kr/test?env=production',
		order_id: (new Date()).getTime(),
		use_order_id: 1,
		pg: document.getElementsByName('pg')[0].value,
		method: document.getElementsByName('method')[0].value,
		show_agree_window: false,
		user_token: document.getElementsByName('user_token')[0].value,
		// account_expire_at: '2020-07-30 13:50:02',
		items: [
			{
				item_name: '테스트 아이템',
				qty: 1,
				unique: '123',
				price: 3000
			}
		],
		user_info: {
			username: '홍길동',
			email: 'test.bootpay.co.kr@gmail.com'
		},
		extra: {
			expire_month: '36',
			vbank_result: 1,
			disp_cash_result: 'N',
			// quota: '0,2,3',
			is_done_close: false,
			expire_after_closed: true,
			locale: 'ko',
			theme: 'custom',
			custom_background: '#00a086',
			custom_font_color: '#fff',
			subscribe_test_payment: true,
			// popup: true,
			// quick_popup: true,
			// old_certificate: true,
			// escrow: true,
			memo: '테스트 결제 일가요?'
		}
	}).ready(function (data) {
		console.log(data);
		// alert('가상계좌 발급완료!');
	}).error(function (data) {
		var msg = "결제 에러입니다.: " + JSON.stringify(data)
		setTimeout(function () {
			alert(msg);
		}, 500);

		console.log(data);
	}).cancel(function (data) {
		var msg = "결제 취소입니다.: " + JSON.stringify(data)
		alert(msg);
		console.log(data);
	}).confirm(function (data) {
		if (confirm('결제를 정말 승인할까요?')) {
			console.log("do confirm data: " + JSON.stringify(data));
			this.transactionConfirm(data);
		} else {
			var msg = "결제가 승인거절되었습니다.: " + JSON.stringify(data)
			alert(msg);
			console.log(data);
		}
	}).done(function (data) {
		setTimeout(function () {
			alert("결제가 완료되었습니다.");
		}, 200);
		console.log(data);
	});
}

function doAsyncPayment() {
	BootPay.popupAsyncRequest(BootPay.isMobile(), function () {
		return new Promise(function (resolve, reject) {
			resolve({
				price: document.getElementsByName('price')[0].value,
				tax_free: document.getElementsByName('tax_free')[0].value,
				application_id: '59a7a368396fa64fc5d4a7db',
				name: '테스트 아이템%@@',
				phone: '01000000000',
				return_url: 'https://dev-app.bootpay.co.kr/test?env=production',
				order_id: (new Date()).getTime(),
				use_order_id: 1,
				pg: document.getElementsByName('pg')[0].value,
				method: document.getElementsByName('method')[0].value,
				show_agree_window: false,
				user_token: document.getElementsByName('user_token')[0].value,
				// account_expire_at: '2020-07-30 13:50:02',
				items: [
					{
						item_name: '테스트 아이템',
						qty: 1,
						unique: '123',
						price: 3000
					}
				],
				user_info: {
					username: '홍길동',
					email: 'test.bootpay.co.kr@gmail.com'
				},
				extra: {
					expire_month: '36',
					vbank_result: 1,
					disp_cash_result: 'N',
					// quota: '0,2,3',
					is_done_close: false,
					expire_after_closed: true,
					locale: 'ko',
					theme: 'custom',
					custom_background: '#00a086',
					custom_font_color: '#fff',
					// popup: true,
					// quick_popup: true,
					// old_certificate: true,
					// escrow: true,
					memo: '테스트 결제 일가요?'
				}
			})
		});
	}).ready(function (data) {
		console.log(data);
		// alert('가상계좌 발급완료!');
	}).error(function (data) {
		var msg = "결제 에러입니다.: " + JSON.stringify(data)
		setTimeout(function () {
			alert(msg);
		}, 500);

		console.log(data);
	}).cancel(function (data) {
		var msg = "결제 취소입니다.: " + JSON.stringify(data)
		alert(msg);
		console.log(data);
	}).confirm(function (data) {
		if (confirm('결제를 정말 승인할까요?')) {
			console.log("do confirm data: " + JSON.stringify(data));
			this.transactionConfirm(data);
		} else {
			var msg = "결제가 승인거절되었습니다.: " + JSON.stringify(data)
			alert(msg);
			console.log(data);
		}
	}).done(function (data) {
		setTimeout(function () {
			alert("결제가 완료되었습니다.");
		}, 200);
		console.log(data);
	});
}

function doAllPayment() {
	BootPay.request({
		price: document.getElementsByName('price')[0].value,
		application_id: '59a7a368396fa64fc5d4a7db',
		name: '테스트 아이템',
		phone: '01000000000',
		order_id: (new Date()).getTime(),
		show_agree_window: 1,
		user_token: document.getElementsByName('user_token')[0].value,
		items: [
			{
				item_name: '테스트 아이템',
				qty: 1,
				unique: '123',
				price: 3000
			}
		],
		user_info: {
			email: 'test.bootpay.co.kr@gmail.com'
		},
		extra: {
			// popup: true,
			// quick_popup: true,
			theme: ''
		}
	}).ready(function (data) {
		alert('가상계좌 발급완료!');
	}).error(function (data) {
		var msg = "결제 에러입니다.: " + JSON.stringify(data)
		alert(msg);
		console.log(data);
	}).cancel(function (data) {
		var msg = "결제 취소입니다.: " + JSON.stringify(data)
		alert(msg);
		console.log(data);
	}).confirm(function (data) {
		if (confirm('결제를 정말 승인할까요?')) {
			console.log("do confirm data: " + JSON.stringify(data));
			this.transactionConfirm(data);
		} else {
			var msg = "결제가 승인거절되었습니다.: " + JSON.stringify(data);
			alert(msg);
			console.log(data);
		}
	}).done(function (data) {
		alert("결제가 완료되었습니다.");
		console.log(data);
	});
}

function doAsyncAllPayment() {
	BootPay.popupAsyncRequest(BootPay.isMobile(), function () {
		return new Promise(function (resolve, reject) {
			resolve({
				price: document.getElementsByName('price')[0].value,
				tax_free: document.getElementsByName('tax_free')[0].value,
				application_id: '59a7a368396fa64fc5d4a7db',
				name: '테스트 아이템%@@',
				phone: '01000000000',
				return_url: 'https://dev-app.bootpay.co.kr/test?env=production',
				order_id: (new Date()).getTime(),
				use_order_id: 1,
				// pg: document.getElementsByName('pg')[0].value,
				// method: document.getElementsByName('method')[0].value,
				show_agree_window: false,
				user_token: document.getElementsByName('user_token')[0].value,
				// account_expire_at: '2020-07-30 13:50:02',
				items: [
					{
						item_name: '테스트 아이템',
						qty: 1,
						unique: '123',
						price: 3000
					}
				],
				user_info: {
					username: '홍길동',
					email: 'test.bootpay.co.kr@gmail.com'
				},
				extra: {
					expire_month: '36',
					vbank_result: 1,
					disp_cash_result: 'N',
					// quota: '0,2,3',
					is_done_close: false,
					expire_after_closed: true,
					locale: 'ko',
					theme: 'custom',
					custom_background: '#00a086',
					custom_font_color: '#fff',
					// popup: true,
					// quick_popup: true,
					// old_certificate: true,
					// escrow: true,
					memo: '테스트 결제 일가요?'
				}
			})
		});
	}).ready(function (data) {
		console.log(data);
		setTimeout(function () {
			alert('가상계좌 발급완료!');
		}, 1000);

	}).error(function (data) {
		var msg = "결제 에러입니다.: " + JSON.stringify(data)
		alert(msg);
		console.log(data);
	}).cancel(function (data) {
		var msg = "결제 취소입니다.: " + JSON.stringify(data)
		alert(msg);
		console.log(data);
	}).confirm(function (data) {
		if (confirm('결제를 정말 승인할까요?')) {
			console.log("do confirm data: " + JSON.stringify(data));
			this.transactionConfirm(data);
		} else {
			var msg = "결제가 승인거절되었습니다.: " + JSON.stringify(data)
			alert(msg);
			console.log(data);
		}
	}).done(function (data) {
		alert("결제가 완료되었습니다.");
		console.log(data);
	});
}

function changeMethod(e) {
	switch (e.value) {
		case 'card_rebill':
			document.getElementsByName('price')[0].value = 0;
			break;
		case 'auth':
			document.getElementsByName('price')[0].value = 0;
			break;
		default:
			document.getElementsByName('price')[0].value = 3000;
	}
}