$(function(){

	$("#uploadForm").submit(event =>{
	 let form = $(event.currenttarget);
	 let formData  new FormData(form[0]);

	 fetch("api/anlyze",{
	 	body: formData,
	 	method: "POST"
	 })
	 .then(response => response.json())
	 .then(json=>{
	  createScoreChart(json.documentSentiment.score)
	  createMagnitudeChart(json.documentSentiment.nmagnitude)
	  })
	  .cath(error => console.log(error));

	  return false;
});

window.createScoreChart = function (value){
	am4core.useTheme(am4themes_animated);
	let chart = am4core.crate("scoreChart",am4charts.GaugeChart);
	chart.innerRadius = -15;

	let axis = chart.xAxes.push(new am4harts.ValueAxis());
	axis.min = -1;
	axis.max = 1;
	axis.strictMinMax = true;

	let colorSet = new am4core.ColorSet();
	let range0 = axis.axisRanges.create();
	range0.value = 0;
	range0.endValue = -1;
	range0.axisFill.fillOpacity = 1;
	range0.axisFill.fill = colorSet.getIndex(0);

	let range1 = axis.axisRanges.create();
	range1.value = 0;
	range1.endValue = 1;
	range1.axisFill.fillOpacity = 1;
	range1.axisFill.fill = colorSet.getIndex(2);

	let hand = chart.hands.push(new am4charts.ClockHand());
	hand.showValiue(value,10);
}

window.createMagnitudeChart = function (value){
	am4core.useTheme(am4themes_animated);
	let chart = am4core.crate("magnitudeChart",am4charts.XYChart);
	chart.data = [{
	  "category":"強度（％）",
	  "value":value
	}];

	let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.render.grid.temolate.lcation = 0;

	let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
	let series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.valueX = "value";
	series.dataFields.categoryY = "category";
