var data = $.parseJSON($.ajax({
	url: "data.json", //json文件位置，文件名
	dataType: "json", //返回数据格式为json
	async: false
}).responseText);
console.log(data);

var rules = $.parseJSON($.ajax({
	url: "rules.json", //json文件位置，文件名
	dataType: "json", //返回数据格式为json
	async: false
}).responseText);
console.log(rules);

function getTimeState() {
	// 获取当前时间
	var timeNow = new Date();
	// 获取当前小时
	var hours = timeNow.getHours();
	// 设置默认文字
	var text = 0;
	// 判断当前时间段
	if (hours >= 0 && hours <= 10) {
		data["summary_background"] = "morning_background";
		text = 1;
	} else if (hours > 10 && hours <= 14) {
		data["summary_background"] = "morning_background";
		text = 2;
	} else if (hours > 14 && hours <= 18) {
		data["summary_background"] = "evening_background";
		text = 3;
	} else if (hours > 18 && hours <= 24) {
		data["summary_background"] = "night_background";
		text = 4;
	}
	// 返回当前时间段对应的状态
	return text;
};

getTimeState();

var vm = new Vue({
	el: '#vm',
	data: data,
	methods: {
		randomrule() {
			//检查是否有全空的情况
			if (vm.modeCheckList.length == 0) {
				vm.modeCheckList = ["躲猫猫"]
				if (vm.mapCheckList.length == 0) {
					vm.mapCheckList = ["88区"]
					this.$message({
						message: '模式和地图已经帮您全选！',
						type: 'success',
					});
				} else {
					this.$message({
						message: '模式已经帮您全选！',
						type: 'success'

					});
				}
			} else {
				if (vm.mapCheckList.length == 0) {
					vm.mapCheckList = ["88区"]
					this.$message({
						message: '地图已经帮您全选！',
						type: 'success'
					});

				}
			}

			//开始幸运抽奖
			vm.loading = true,
			vm.randomNum = Math.floor(Math.random() * (rules.length)) + 1
			this.$notify({
				title: '成功',
				message: '新的规则已经生成！ ID：'+ vm.randomNum,
				type: 'success'
			});
			vm.randomNum = vm.randomNum - 1,
			
			vm.presentMode = rules[vm.randomNum]["mode"],
			vm.presentMap = rules[vm.randomNum]["map"],
			vm.presentruleA = rules[vm.randomNum]["ruleA"],
			vm.presentruleAttack = rules[vm.randomNum]["rule_attack"],
			vm.presentruleDefend = rules[vm.randomNum]["rule_defend"],
			
			vm.loading = false
		},
		
		randomruleclear() {
			vm.randomNum = null
		}
	}
});