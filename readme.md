# React with d3

d3 based charts as react components

## Data structure

I'm using similar data structure to Google charts, for example:
```javascript
const data = [
    ['Year', 'Sales', 'Revenue'],
    ['2011', 300, 100],
    ['2012', 180, 10],
    ['2013', 510, 230],
    ['2014', 400, 100],
    ['2015', 1170, 700],
    ['2016', 660, 210],
    ['2017', 1030, 500]
];
```

## Charts

![alt tag](img/columns.png)

![alt tag](img/grouped-columns.png)

![alt tag](img/line-chart.png)

![alt tag](img/line-chart-gradient.png)

![alt tag](img/stacked-columns-tooltip.png)

![alt tag](img/zoom-brush.png)

![alt tag](img/zoom-brush-2.png)

## ToDo

* Line + Dots chart
* Percentage bar chart
* Large data charts
* Chart with dynamically updating data
* **Tests**
    * jest snapshots (?) https://facebook.github.io/jest/blog/2016/07/27/jest-14.html

## D3 examples

* Zoom
  http://bl.ocks.org/mbostock/431a331294d2b5ddd33f947cf4c81319
* Brush & custom handlers
  http://bl.ocks.org/mbostock/4349545


## Charts for inspiration

* http://www.anychart.com/products/anychart/gallery/
* https://www.amcharts.com/demos/
* https://www.zingchart.com/gallery/
