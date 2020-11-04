
function moveFromTowerToTower(fromSeq, toSeq){

		let hr_=null;
		let tdnew_=null;
		let tdold_=null;
		$("td[seq"+fromSeq+"]").each(function(){
			let hr = $(this).find("hr[real]");
			if(hr.length == 1){

				let bottom_empty_td=null;
				$("td[seq"+toSeq+"]").each(function(){
					let hrTo = $(this).find("hr[real]");
					if(hrTo.length == 1)
						return false; //break
					bottom_empty_td = $(this);
				});
				hr_ = hr;
				tdnew_ = bottom_empty_td;
				tdold_ = $(this);
				return false; //break
			}
		});
		return [hr_, tdold_, tdnew_];

}

let intervalIndex;
function guiMove(STO){

	let hr_td = moveFromTowerToTower(steps[intervalIndex][0], steps[intervalIndex][1]);

	hr_td[0].animate({
			 left: hr_td[2].offset().left+'px',
			// top: hr_td[2].offset().top+'px'

			//left: '10px',
			//top: '20px'

		}, STO, function(){

			hr_td[2].find("hr[fake]").remove();
			hr_td[0].appendTo(hr_td[2]);
			hr_td[1].append($("<hr fake style='visibility:hidden;' />"));
			hr_td[0].css("left", "").css("top", "");
			intervalIndex++;
			if(intervalIndex==steps.length) {

				{
					times = 0;
					steps = new Array();
					setIntervalFlag= false;
				}
				setTimeout(function(){
					alert("完成! 总"+intervalIndex+"步, 耗时"+((new Date().getTime()-startms)/1000)+"秒");
				},100);
						
			}else{
				guiMove(STO);
			}

	});
	
}

let times = 0;

let steps = new Array();
let setIntervalFlag= false;
let startms;
function move(fromSeq, toSeq, howMany, STO){ //seq = 1/2/3

	if(!setIntervalFlag){
		setIntervalFlag=true;
		startms = new Date().getTime();
		intervalIndex = 0;
		//alert(startms);
		setTimeout(function(){
			guiMove(STO);
		},1000);

	}

	//assert howMany>=1;

	//setTimeout(function(){
		if(howMany == 1){

			//setTimeout(function(){
				times++;
				//console.log("第"+times+"步: 从"+fromSeq+"移动到"+toSeq);
				//moveFromTowerToTower(fromSeq, toSeq);

				
				//if(steps.length<10000)
					steps.push([fromSeq, toSeq]);
				

			//}, STO);
		}else{
			//setTimeout(function(){
				let otherSeq = (1+2+3)-fromSeq-toSeq; //借助哪个柱子
				move(fromSeq, otherSeq, howMany-1, STO*2);
				move(fromSeq, toSeq, 1, STO*3);
				move(otherSeq, toSeq, howMany-1, STO*4);
			//}, STO);
		}
	//}, STO);
	
}

//move(1, 3, 1);
