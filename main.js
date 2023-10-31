var PowerData = null;
var borderData = null;
var selectedCountry = "Allcountries";
var selectedType = "Alltypes";
var baseLayerGroups =null;

//发电类型
const typeNames = [
    'Hydro', 'Solar', 'Gas', 'Other', 'Oil', 'Wind', 'Nuclear', 'Coal',
    'Waste', 'Biomass', 'Wave and Tidal', 'Petcoke', 'Geothermal',
    'Storage', 'Cogeneration'
];
const LowcarbonNames = ["Hydro", "Wind", "Solar", "Nuclear", "Biomass", "Geothermal", "Wave and Tidal", "Waste", "Other"];
const HighcarbonNames = ["Coal", "Oil", "Gas", "Petcoke", "Cogeneration", "Storage"];

//国家名称与ISO3代码的对应关系数组
const Iso3world = {
    'Afghanistan': 'AFG',
    'Albania': 'ALB',
    'Algeria': 'DZA',
    'Angola': 'AGO',
    'Antarctica': 'ATA',
    'Argentina': 'ARG',
    'Armenia': 'ARM',
    'Australia': 'AUS',
    'Austria': 'AUT',
    'Azerbaijan': 'AZE',
    'Bahrain': 'BHR',
    'Bangladesh': 'BGD',
    'Belarus': 'BLR',
    'Belgium': 'BEL',
    'Benin': 'BEN',
    'Bhutan': 'BTN',
    'Bolivia': 'BOL',
    'Bosnia and Herzegovina': 'BIH',
    'Botswana': 'BWA',
    'Brazil': 'BRA',
    'Brunei Darussalam': 'BRN',
    'Bulgaria': 'BGR',
    'Burkina Faso': 'BFA',
    'Burundi': 'BDI',
    'Cambodia': 'KHM',
    'Cameroon': 'CMR',
    'Canada': 'CAN',
    'Cape Verde': 'CPV',
    'Central African Republic': 'CAF',
    'Chile': 'CHL',
    'China': 'CHN',
    'Colombia': 'COL',
    'Congo': 'COG',
    'Costa Rica': 'CRI',
    'Cote DIvoire': 'CIV',
    'Croatia': 'HRV',
    'Cuba': 'CUB',
    'Cyprus': 'CYP',
    'Czech Republic': 'CZE',
    'Democratic Republic of the Congo': 'COD',
    'Denmark': 'DNK',
    'Djibouti': 'DJI',
    'Dominican Republic': 'DOM',
    'Ecuador': 'ECU',
    'Egypt': 'EGY',
    'El Salvador': 'SLV',
    'Equatorial Guinea': 'GNQ',
    'Eritrea': 'ERI',
    'Estonia': 'EST',
    'Ethiopia': 'ETH',
    'Fiji': 'FJI',
    'Finland': 'FIN',
    'France': 'FRA',
    'French Guiana': 'GUF',
    'Gabon': 'GAB',
    'Gambia': 'GMB',
    'Georgia': 'GEO',
    'Germany': 'DEU',
    'Ghana': 'GHA',
    'Greece': 'GRC',
    'Guatemala': 'GTM',
    'Guinea': 'GIN',
    'Guinea-Bissau': 'GNB',
    'Guyana': 'GUY',
    'Honduras': 'HND',
    'Hungary': 'HUN',
    'Iceland': 'ISL',
    'India': 'IND',
    'Indonesia': 'IDN',
    'Iran': 'IRN',
    'Iraq': 'IRQ',
    'Ireland': 'IRL',
    'Israel': 'ISR',
    'Italy': 'ITA',
    'Jamaica': 'JAM',
    'Japan': 'JPN',
    'Jordan': 'JOR',
    'Kazakhstan': 'KAZ',
    'Kenya': 'KEN',
    'Kosovo': 'KOS',
    'Kuwait': 'KWT',
    'Kyrgyzstan': 'KGZ',
    'Laos': 'LAO',
    'Latvia': 'LVA',
    'Lebanon': 'LBN',
    'Lesotho': 'LSO',
    'Liberia': 'LBR',
    'Libya': 'LBY',
    'Lithuania': 'LTU',
    'Luxembourg': 'LUX',
    'Macedonia': 'MKD',
    'Madagascar': 'MDG',
    'Malawi': 'MWI',
    'Malaysia': 'MYS',
    'Mali': 'MLI',
    'Mauritania': 'MRT',
    'Mauritius': 'MUS',
    'Mexico': 'MEX',
    'Moldova': 'MDA',
    'Mongolia': 'MNG',
    'Montenegro': 'MNE',
    'Morocco': 'MAR',
    'Mozambique': 'MOZ',
    'Myanmar': 'MMR',
    'Namibia': 'NAM',
    'Nepal': 'NPL',
    'Netherlands': 'NLD',
    'New Zealand': 'NZL',
    'Nicaragua': 'NIC',
    'Niger': 'NER',
    'Nigeria': 'NGA',
    'North Korea': 'PRK',
    'Norway': 'NOR',
    'Oman': 'OMN',
    'Pakistan': 'PAK',
    'Palestine': 'PSE',
    'Panama': 'PAN',
    'Papua New Guinea': 'PNG',
    'Paraguay': 'PRY',
    'Peru': 'PER',
    'Philippines': 'PHL',
    'Poland': 'POL',
    'Portugal': 'PRT',
    'Qatar': 'QAT',
    'Romania': 'ROU',
    'Russia': 'RUS',
    'Rwanda': 'RWA',
    'Saint Lucia': 'LCA',
    'Saudi Arabia': 'SAU',
    'Senegal': 'SEN',
    'Serbia': 'SRB',
    'Sierra Leone': 'SLE',
    'Singapore': 'SGP',
    'Slovakia': 'SVK',
    'Slovenia': 'SVN',
    'South Africa': 'ZAF',
    'South Korea': 'KOR',
    'Spain': 'ESP',
    'Sri Lanka': 'LKA',
    'Sudan': 'SDN',
    'Suriname': 'SUR',
    'Swaziland': 'SWZ',
    'Sweden': 'SWE',
    'Switzerland': 'CHE',
    'Syrian Arab Republic': 'SYR',
    'Tajikistan': 'TJK',
    'Tanzania': 'TZA',
    'Thailand': 'THA',
    'Togo': 'TGO',
    'Trinidad and Tobago': 'TTO',
    'Tunisia': 'TUN',
    'Turkey': 'TUR',
    'Turkmenistan': 'TKM',
    'Uganda': 'UGA',
    'Ukraine': 'UKR',
    'United Arab Emirates': 'ARE',
    'United Kingdom': 'GBR',
    'United States of America': 'USA',
    'Uruguay': 'URY',
    'Uzbekistan': 'UZB',
    'Venezuela': 'VEN',
    'Vietnam': 'VNM',
    'Western Sahara': 'ESH',
    'Yemen': 'YEM',
    'Zambia': 'ZMB',
    'Zimbabwe': 'ZWE'
}

//创建地图对象
const map = L.map('mapid', {
    center: [30, 114],
    zoom: 15,
    zoomControl: false,
});

//创建比例尺控件
L.control.scale({
    metric : true,
    imperial: false,
    position: 'bottomright'
}).addTo(map);

//创建缩放控件
L.control.zoom({
    zoomInTitle: '放大',
    zoomOutTitle: '缩小',
    position: 'bottomright' 
}).addTo(map);


//添加图层图底
const TianDiTu_NormalCanvas = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
    key: '21ab8645b7a4e33db43a3766d94eef14',
    attribution: '地图数据 &copy; <a href="https://www.tianditu.gov.cn/">天地图</a>,<a href="http://datav.aliyun.com/tools/atlas/">DATAV.GeoAtlas</a> ',
    maxZoom: 18,
    minZoom: 1,
})

const TianDiTu_NormalAnnotion = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
    key: '21ab8645b7a4e33db43a3766d94eef14',
    attribution: '地图数据 &copy; <a href="https://www.tianditu.gov.cn/">天地图</a>,<a href="http://datav.aliyun.com/tools/atlas/">DATAV.GeoAtlas</a> ',
    maxZoom: 18,
    minZoom: 1,
})

const TianDiTu_SatelliteCanvas = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
    key: '21ab8645b7a4e33db43a3766d94eef14',
    attribution: '地图数据 &copy; <a href="https://www.tianditu.gov.cn/">天地图</a>,<a href="http://datav.aliyun.com/tools/atlas/">DATAV.GeoAtlas</a> ',
    maxZoom: 18,
    minZoom: 1,
})

const TianDiTu_SatelliteAnnotion = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
    key: '21ab8645b7a4e33db43a3766d94eef14',
    attribution: '地图数据 &copy; <a href="https://www.tianditu.gov.cn/">天地图</a>,<a href="http://datav.aliyun.com/tools/atlas/">DATAV.GeoAtlas</a> ',
    maxZoom: 18,
    minZoom: 1,
})

const Google_NormalCanvas = L.tileLayer.chinaProvider('Google.Normal.Map', {
    attribution: 'Map data &copy; 2019 Google',
    maxZoom: 18,
    minZoom: 1,
})

const Google_StaelliteCanvas = L.tileLayer.chinaProvider('Google.Satellite.Map', {
    attribution: 'Map data &copy; 2019 Google',
    maxZoom: 18,
    minZoom: 1,
})
const Google_StaelliteAnnotion = L.tileLayer.chinaProvider('Google.Satellite.Annotion', {
    attribution: 'Map data &copy; 2019 Google',
    maxZoom: 18,
    minZoom: 1,
})

const NASAGIBS_ViirsEarthAtNight2012 = L.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
    attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
    bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
    minZoom: 1,
    maxZoom: 8,
    format: 'jpg',
    time: '',
    tilematrixset: 'GoogleMapsCompatible_Level'
}).addTo(map);

const TianDiTu_Normal = L.layerGroup([TianDiTu_NormalCanvas, TianDiTu_NormalAnnotion]);
const TianDiTu_Satellite = L.layerGroup([TianDiTu_SatelliteCanvas, TianDiTu_SatelliteAnnotion]);
const Google_Normal = L.layerGroup([Google_NormalCanvas]);
const Google_Staellite = L.layerGroup([Google_StaelliteCanvas, Google_StaelliteAnnotion]);

baseLayerGroups = {
    "NASAGIBS_ViirsEarthAtNight2012":NASAGIBS_ViirsEarthAtNight2012,
    "TianDiTu_Normal":TianDiTu_Normal,
    "TianDiTu_Satellite":TianDiTu_Satellite,
    "Google_Normal":Google_Normal,
    "Google_Staellite":Google_Staellite,
}


//创建标记数据层
const markerLayer = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
    },
    onEachFeature: onEachFeature,
    style: style,
});

//创建边界数据层
const borderLayer = L.geoJson(null, {
    style: myPolygonStyle,
});

//创建聚合图层
const clusterLayer = L.markerClusterGroup({ disableClusteringAtZoom: 6 });

/**
*过滤得到最终发电数据
*/
function filterData(countryName, Type) {
    //获取选择的发电类型
    var filterTypes = filterType(Type);
    var stations = null;

    //全球情况单处理
    if (countryName == "Allcountries") {
        stations = PowerData.filter(function (item) {
            return filterTypes.includes(item.primary_fuel);
        });
    } else {
        stations = PowerData.filter(function (item) {
            return countryName == item.country && filterTypes.includes(item.primary_fuel);
        });
    }

    //利用Turf将过滤数据转换为GeoJSON格式
    const stationData = turf.featureCollection(stations.map(function (point) {
        return turf.point([point.longitude, point.latitude], {
            name: point.name,
            country_long: point.country_long,
            capacity_mw: point.capacity_mw,
            primary_fuel: point.primary_fuel,
        });
    }))

    borderLayer.clearLayers();

    //如果不是选择全球数据，则添加选择国家边界图层
    if (countryName != "Allcountries") {
        borderLayer.addData(borderData.features.filter(function (item) {
            return countryName == item.properties.ISO_A3;
        }));
        borderLayer.addTo(map);
    }

    markerLayer.clearLayers();
    clusterLayer.clearLayers();
    markerLayer.addData(stationData);
    let layers = markerLayer.getLayers();

    //根据数据量判断是否使用聚合图层
    if (layers.length > 1500) {
        markerLayer.clearLayers();
        for (const key in layers) {
            if (layers.hasOwnProperty(key)) {
                clusterLayer.addLayer(layers[key]);
            }
        }
        clusterLayer.addTo(map);
    }
    else {
        markerLayer.addTo(map);
    }

    //设置地图视野
    if (borderLayer.getLayers().length > 0) {
        map.fitBounds(borderLayer.getBounds());
    } else if (markerLayer.getLayers().length > 0) {
        map.fitBounds(markerLayer.getBounds());
    } else {
        map.fitBounds(clusterLayer.getBounds());
    }
}

/*
*根据选择类型获取发电类型列表
*/
function filterType(selectedType) {
    switch (selectedType) {
        case "Alltypes":
            return typeNames;
        case "Lowcarbon":
            return LowcarbonNames;
        case "Highcarbon":
            return HighcarbonNames;
        default:v   
            return [selectedType];
    }
}


//读取发电场CSV数据
Papa.parse("Data/global_power_plant_database.csv", {
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: function (results) {
        PowerData = results.data;
        filterData(selectedCountry, selectedType);
    }
})

//读取国家边界数据
$.getJSON("Data/WB_countries_Admin0.geojson", function (data) {
    borderData = data;
});

/* 监听事件 */
/* 根据选择的国家获取相应国家的发电厂数据 */


//添加选项
for (key in Iso3world) {
    const optionElement = document.createElement("option");
    optionElement.textContent = key;
    optionElement.value = Iso3world[key];
    $("#selector1").append(optionElement);
}
for (key in typeNames) {
    const optionElement = document.createElement("option");
    optionElement.textContent = typeNames[key];
    optionElement.value = typeNames[key];
    $("#selector2").append(optionElement);
}


$("#selector1").change(function (event) {
    // 获取所选option的value值
    selectedCountry = event.target.value;
    // console.log(selectedCountry);
    filterData(selectedCountry, selectedType);

    var newSubtitle = $("#selector1 option:selected").text();

    $("#subtitle").fadeOut(200, function () {
        $(this).text(newSubtitle).fadeIn(200);
    })

    updateTotal(selectedCountry)
});


$("#selector2").change(function (event) {
    // 获取所选option的value值
    selectedType = event.target.value;
    // console.log(selectedType);
    filterData(selectedCountry, selectedType);
});
$("#selector3").change(function(event){
    // 获取所选option的value值
    var selectedBaseLayer = event.target.value;
    // console.log(selectedBaseLayer);
    for (key in baseLayerGroups){
        map.removeLayer(baseLayerGroups[key]);
    }
    baseLayerGroups[selectedBaseLayer].addTo(map);
})

//发电类型与颜色的对应关系
const Colors = {
    "Biomass": "#A7B734",
    "Coal": "#333333",
    "Cogeneration": "#805238",
    "Gas": "#216184",
    "Geothermal": "#C7432B",
    "Hydro": "#2cb0c1",
    "Nuclear": "#A14A7B",
    "Oil": "#673b9b",
    "Solar": "#EFC530",
    "Storage": "#e58888",
    "Wave and Tidal": "#a9bbff",
    "Wind": "#136400",
    "Waste": "#d67b36",
    "Other": "#7c5641",
    "Petcoke": "#06710d"
}

function myPolygonStyle() {
    return {
        "color": "#999999",
        "weight": 3,
        "opacity": 0.9,
        "fillOpacity": 0.22
    }
}

function getRadius(d) {
    return d > 12800 ? 54.1 :
        d > 6400 ? 46.1 :
            d > 3200 ? 32.9 :
                d > 1600 ? 23.6 :
                    d > 800 ? 17.0 :
                        d > 400 ? 12.3 :
                            d > 200 ? 8.9 :
                                d > 100 ? 6.6 :
                                    d > 50 ? 5.0 :
                                        d > 25 ? 3.8 :
                                            3.5;
}

function style(feature) {
    return {
        fillColor: Colors[feature.properties.primary_fuel],
        weight: 0.4,
        opacity: 0.37,
        color: "#f3f3f3",
        fillOpacity: 0.73,
        radius: getRadius(feature.properties.capacity_mw),
    }
}

function onEachFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup('<h1 style= color:' + Colors[feature.properties.primary_fuel] + ';><b>' + feature.properties.name + '</h1>装机容量:</b>' + feature.properties.capacity_mw + 'MW<br /><b>发电类型:</b>' + feature.properties.primary_fuel + '<br /><b>国家:</b>' + feature.properties.country_long, { closeButton: false, offset: L.point(0, -20) })
        layer.on('mouseover', function () { layer.openPopup(); });
        layer.on('mouseout', function () { layer.closePopup(); });
    }
}

//国家总发电量数组
var totalsArray = {
    'Allcountries': 5706975.447256999,
    'AFG': 300.55,
    'ALB': 1529.0,
    'DZA': 15873.8,
    'AGO': 1071.1799999999998,
    'ATA': 7.6,
    'ARG': 32913.079,
    'ARM': 3271.0,
    'AUS': 65852.016,
    'AUT': 11227.1,
    'AZE': 5764.0,
    'BHR': 7586.3,
    'BGD': 11840.0,
    'BLR': 8534.9,
    'BEL': 13404.8,
    'BEN': 60.5,
    'BTN': 1482.2,
    'BOL': 1563.12,
    'BIH': 3985.5,
    'BWA': 746.0,
    'BRA': 147589.27133000002,
    'BRN': 586.0,
    'BGR': 9252.200000000003,
    'BFA': 229.306,
    'BDI': 57.17,
    'KHM': 1517.6,
    'CMR': 881.5799999999999,
    'CAN': 143578.7,
    'CPV': 92.805,
    'CAF': 33.664,
    'CHL': 22475.648667,
    'CHN': 1452279.2399999998,
    'COL': 10924.0,
    'COG': 625.9000000000001,
    'CRI': 1968.4,
    'CIV': 1203.0,
    'HRV': 3274.5,
    'CUB': 3796.8,
    'CYP': 1468.0,
    'CZE': 16871.7,
    'COD': 3057.04,
    'DNK': 8085.199999999999,
    'DJI': 107.332,
    'DOM': 1858.0899999999997,
    'ECU': 4245.4800000000005,
    'EGY': 34183.5,
    'SLV': 1418.5,
    'GNQ': 150.5,
    'ERI': 133.19,
    'EST': 2541.9,
    'ETH': 4023.9,
    'FJI': 317.38,
    'FIN': 11796.76,
    'FRA': 110615.9289,
    'GUF': 252.6,
    'GAB': 446.80999999999995,
    'GMB': 70.4,
    'GEO': 3831.3999999999996,
    'DEU': 112040.37487999999,
    'GHA': 2108.0,
    'GRC': 14658.65,
    'GTM': 3689.1,
    'GIN': 510.41999999999996,
    'GNB': 18.237,
    'GUY': 136.3,
    'HND': 2164.87,
    'HUN': 6290.7,
    'ISL': 2484.6,
    'IND': 316088.546,
    'IDN': 48751.418000000005,
    'IRN': 61362.1,
    'IRQ': 18160.6,
    'IRL': 7582.15,
    'ISR': 14665.8,
    'ITA': 73095.06,
    'JAM': 792.5000000000001,
    'JPN': 215365.84999999998,
    'JOR': 4703.5,
    'KAZ': 18628.0,
    'KEN': 2485.9,
    'KOS': 1478.0,
    'KWT': 17829.5,
    'KGZ': 3634.0,
    'LAO': 4986.86,
    'LVA': 2537.0,
    'LBN': 2070.3,
    'LSO': 72.0,
    'LBR': 73.3,
    'LBY': 6231.0,
    'LTU': 3490.8,
    'LUX': 1681.0,
    'MKD': 1362.6000000000001,
    'MDG': 359.93,
    'MWI': 369.1,
    'MYS': 28794.5,
    'MLI': 311.5,
    'MRT': 315.804,
    'MUS': 989.269,
    'MEX': 62365.9,
    'MDA': 2914.0,
    'MNG': 904.0,
    'MNE': 885.5,
    'MAR': 8697.56,
    'MOZ': 2285.0,
    'MMR': 3987.1,
    'NAM': 502.5,
    'NPL': 587.9499999999999,
    'NLD': 16993.689999999995,
    'NZL': 6674.55,
    'NIC': 863.4000000000001,
    'NER': 167.2,
    'NGA': 6260.0,
    'PRK': 9208.0,
    'NOR': 32551.0,
    'OMN': 6010.8,
    'PAK': 21455.0,
    'PSE': 7.6,
    'PAN': 1633.2,
    'PNG': 406.9,
    'PRY': 8760.0,
    'PER': 7432.1,
    'PHL': 20719.3,
    'POL': 37902.0,
    'PRT': 14744.864,
    'QAT': 10548.0,
    'ROU': 14646.900000000001,
    'RUS': 228220.05,
    'RWA': 193.68,
    'LCA': 3.0,
    'SAU': 84341.55,
    'SEN': 696.16,
    'SRB': 7958.0,
    'SLE': 126.0,
    'SGP': 13660.0,
    'SVK': 6230.86,
    'SVN': 2736.0,
    'ZAF': 50422.7,
    'KOR': 99472.68,
    'ESP': 79035.068,
    'LKA': 3720.1,
    'SDN': 2798.11,
    'SUR': 5.0,
    'SWZ': 94.8,
    'SWE': 26418.7,
    'CHE': 13118.0,
    'SYR': 7966.0,
    'TJK': 5296.4,
    'TZA': 994.5,
    'THA': 39654.3,
    'TGO': 195.114,
    'TTO': 2144.6,
    'TUN': 5052.2,
    'TUR': 51444.7,
    'TKM': 3454.0,
    'UGA': 772.5,
    'UKR': 48569.8,
    'ARE': 30327.0,
    'GBR': 97155.28448,
    'USA': 1204638.05,
    'URY': 4209.12,
    'UZB': 12640.0,
    'VEN': 31096.0,
    'VNM': 41350.49,
    'ESH': 23.4,
    'YEM': 1045.0,
    'ZMB': 2689.337,
    'ZWE': 1670.0
}

//更新总发电量
function updateTotal(countryName) {
    let myTotal = totalsArray[countryName];
    $(".total").fadeOut(200, function () {
        $("#total").text(myTotal);
        $(".total").fadeIn(200);
    });
}


$(document).ready(function () {
    initialDraw("Allcountries")
    drawChart1("Allcountries")
    drawChart2("Allcountries")
})

/**
 D3绘图
 */


var margin = { top: 50, right: (parseInt(d3.select("#chart-1").style("width")) / 13 + 10), bottom: 10, left: (parseInt(d3.select("#chart-1").style("width")) / 5 + 60) },
    height = parseInt(d3.select("#chart-1").style("width")) + 100 - margin.left - margin.right,
    width = 320 - margin.top - margin.bottom;

var y = d3.scaleBand().range([0, height * 0.95]);

var x = d3.scaleLinear().range([0, width]);

var xAxis = d3.axisTop()
    .scale(x)
    .ticks(3);

var yAxis = d3.axisLeft()
    .scale(y)

var colorScale = d3.scaleOrdinal()
    .domain(["Biomass", "Coal", "Cogeneration", "Gas", "Geothermal", "Hydro", "Nuclear", "Oil", "Solar", "Storage", "Wave and Tidal", "Wind", "Waste", "Other", "Petcoke"])
    .range(["#A7B734", "#333333", "#805238", "#216184", "#C7432B", "#2cb0c1", "#A14A7B", "#673b9b", "#EFC530", "#e58888", "#a9bbff", "#136400", "#d67b36", "#7c5641", "#06710d"]);

var commaFormat = d3.format(',');

//绘制chart1 svg
var svg = d3.select("#chart-1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "svg-1")
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//添加一个提示框
var div = d3.select("#chart-1")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

svg.append("g")
    .attr("class", "label")
    .append("text")
    .attr("x", width)
    .attr("y", -35)
    .style("text-anchor", "end")
    .text("装机容量(MW)");



function initialDraw(state) {
    d3.json("Data/sum_capa_bytype.json")
        .then(function (data) {
            arrayData = Object.entries(data);
            // console.log(arrayData.sort(function (a, b) {return b[1][state] - a[1][state];}).map(function (d) {return d[0];}))
            y.domain(arrayData.sort(function (a, b) { return b[1][state] - a[1][state]; }).map(function (d) { return d[0]; }));
            x.domain([0, d3.max(arrayData, function (d) { return d[1][state] * 1.1 })]);


            svg.append("g")
                .attr("class", "x axis")
                .transition()
                .duration(1000)
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "middle")
                .attr("dx", "0em")
                .attr("dy", "-.25em");

            svg.append("g")
                .attr("class", "y axis")
                .transition()
                .duration(1000)
                .call(yAxis)
                .selectAll("text")
                .attr("dx", "0em")
                .attr("dy", "0.2em")
                .style("text-anchor", "end")
                .style("font-size", "16px");

            var bar = svg.selectAll(".bar").data(arrayData);
            var barExit = bar.exit().remove();
            var barEnter = bar.enter()
                .append("g")
                .attr("class", "bar");

            var barRects = barEnter.append("rect")
                .attr("rx", 4)
                .attr("y", function (d) { return y(d[0]) })
                .attr("width", function (d) { return x(0) })
                .attr("x", function (d) { return x(0) })
                .attr("height", y.bandwidth() * 0.78)
                .style("fill", function (d) { return colorScale(d[0]) })
                .on("mouseover", function (event, d) {
                    console.log("<b>装机容量: </b>" + commaFormat(d[1][state]) + " MW");
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                    div.transition()
                        .duration(200)
                        .style("opacity", 1);
                    div.html("<b>装机容量: </b>" + commaFormat(d[1][state]) + " MW")
                        .style("positon", "absolute")
                        .style("left", (event.pageX) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function (d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            var barRectUpdate = bar.select("rect")
                .transition()
                .duration(1800)
                .attr("y", function (d) { return y(d[0]); })
                .attr("x", function (d) { return x(0); })
                .attr("height", y.bandwidth() * 0.78)
                .attr("width", function (d) { return x(d[1][state]) })
                .style("fill", function (d) { return colorScale(d[0]) });
        })
}

//响应事件，根据选择国家绘制图表
d3.select("#selector1").on("change", selectState)
//相应函数
function selectState() {

    var state = this.options[this.selectedIndex].value;

    drawChart1(state);

    drawChart2(state);
}

function drawChart1(state) {
    d3.json("Data/sum_capa_bytype.json")
        .then(function (data) {
            // 去除Lowcarbon和Highcarbon
            delete data["Lowcarbon"];
            delete data["Highcarbon"];

            arrayData = Object.entries(data);

            y.domain(arrayData.sort(function (a, b) { return b[1][state] - a[1][state]; }).map(function (d) { return d[0]; }));
            x.domain([0, d3.max(arrayData, function (d) { return d[1][state] * 1.1 })]);


            svg.select(".y.axis").remove();
            svg.select(".x.axis").remove();


            svg.append("g")
                .attr("class", "x axis")
                .transition()
                .duration(1000)
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "middle")
                .attr("dx", "0em")
                .attr("dy", "-.25em");

            svg.append("g")
                .attr("class", "y axis")
                .transition()
                .duration(1000)
                .call(yAxis)
                .selectAll("text")
                .attr("dx", "0em")
                .attr("dy", "0.2em")
                .style("text-anchor", "end")
                .style("font-size", "16px");

            var bar = svg.selectAll(".bar").data(arrayData);
            var barExit = bar.exit().remove();
            var barEnter = bar.enter()
                .append("g")
                .attr("class", "bar");

            var barRects = barEnter.append("rect")
                .attr("rx", 4)
                .attr("y", function (d) { return y(d[0]) })
                .attr("width", function (d) { return x(d[1][state]) })
                .attr("x", function (d) { return x(0) })
                .attr("height", y.bandwidth() * 0.78)
                .style("fill", function (d) { return colorScale(d[0]) })


            var barRectUpdate = bar.select("rect")
                .transition()
                .duration(900)
                .attr("y", function (d) { return y(d[0]); })
                .attr("x", function (d) { return x(0); })
                .attr("height", y.bandwidth() * 0.78)
                .attr("width", function (d) { return x(d[1][state]) })
                .style("fill", function (d) { return colorScale(d[0]) });

            var tooltipUpdate = bar.select("rect")
                .on("mouseover", function (event, d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                    div.transition()
                        .duration(200)
                        .style("opacity", 1);
                    div.html("<span id='#capacity'><b>装机容量: </b></span>" + commaFormat(d[1][state]) + " MW")
                        .style("left", (event.pageX) + "px")
                        .style("top", (event.pageY - 28) + "px")
                })
                .on("mouseout", function (d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        })
}

function drawChart2(state) {

    d3.selectAll("#chart-2 svg").remove();

    var margin = { top: 30, right: (parseInt(d3.select("#chart-2").style("width")) / 13 + 10), bottom: 20, left: 30 },
        width = parseInt(d3.select("#chart-2").style("width")) - margin.left - margin.right,
        height = 80 - margin.top - margin.bottom;

    var xScale = d3.scaleLinear();
    var yScale = d3.scaleBand();

    var colors = d3.scaleLinear()
        .domain([0, 1])
        .range(["#2cb0c1", "#333333"]);

    d3.json("Data/sum_capa_bytype.json")
        .then(function (data) {
            let AllLowcarbon = data["Lowcarbon"]["Allcountries"];
            let AllHighcarbon = data["Highcarbon"]["Allcountries"];

            var datasets = [
                {
                    type: "Lowcarbon",
                    value: data["Lowcarbon"][state] / (data["Lowcarbon"][state] + data["Highcarbon"][state]),
                    prevalue:0
                },
                {
                    type: "Highcarbon",
                    value: data["Highcarbon"][state] / (data["Lowcarbon"][state] + data["Highcarbon"][state]),
                    prevalue: data["Lowcarbon"][state] / (data["Lowcarbon"][state] + data["Highcarbon"][state])
                }
            ];            
            
            
            yScale.domain([0, d3.max(datasets, d => d.value)]).range([0, height]);
            xScale.domain([0,				
                d3.max(datasets, function(d) {
                        return d.value + d.prevalue ;
                })
            ]).range([0,width]);

            var formatAsPercentage = d3.format(".0%");

            var formatAsPercentage2 = d3.format(".1%");

            var xAxis=d3.axisBottom()
                .scale(xScale)
                .ticks(3)
                .tickFormat(formatAsPercentage);
            
            var yAxis = d3.axisLeft()
                .scale(yScale)
                .tickSize(0);


            var svg = d3.select("#chart-2")
                .append("svg")
                .attr("id", "svg-2")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            var div = d3.select("#chart-2")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);


            var bar = svg.selectAll(".bar").data(datasets);

            var barExit = bar.exit().remove();
    
            var barEnter = bar.enter()
                .append("g")
                .attr("class", "bar")
                .style("fill", function(d, i) {
                    return colors(i);
                });
 
            var rects = barEnter.append("rect")
                .attr("rx", 4)
                .attr("class", "bar")
                .attr("x", function(d) {
                    return xScale(d.prevalue) + margin.left;
                })
                .attr("width", function(d) {
                    return xScale(d.value);
                })
                .attr("y", function(d) { return  margin.top; })
                .attr("height", y.bandwidth() * 0.75)
                .on("mouseover", function() { tooltip.style("display", null); })
                .on("mouseout", function() { tooltip.style("display", "none"); })
                .on("mouseover", function(event,d) {		
                    div.transition()
                        .duration(500)	
                        .style("opacity", 0);
                    div.transition()
                        .duration(200)	
                        .style("opacity", 1);	
                    div	.html(formatAsPercentage2(d.value))	 
                        .style("left", (event.pageX) + "px")			 
                        .style("top", (event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {		
                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                });
                
            svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(' + margin.left + ',' + (margin.top + height) + ')')
                    .call(xAxis);
        
            svg.append('g')
                .attr('class', 'y axis')
                .attr("id","yaxisChart2")
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .call(yAxis);
            
            svg.append("text")
                .attr("class", "label-2")
                .attr('x', margin.left + 5)
                .attr('y', 20)
                .style("fill", "#2cb0c1")
                .text("Low carbon");
        
            svg.append("text")
                .attr("class", "label-2")
                .attr('x', width + margin.left - 5)
                .attr('y', 20)
                .style("text-anchor", "end")
                .style("fill", "#898989")
                .text("High carbon"); 
        })
}