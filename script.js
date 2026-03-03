const MAX_CYCLES = 10000;
const DESIGN_VOLTAGE = 350;
let currentCycles = 450;

function updateBMS() {
    const voltage = (DESIGN_VOLTAGE + (Math.random() * 2 - 1)).toFixed(1);
    const temp = (22 + Math.random() * 8).toFixed(1);
    
    document.getElementById('voltage').innerText = `${voltage} V`;
    document.getElementById('temp').innerText = `${temp} °C`;
    const soh = 100 - ((currentCycles / MAX_CYCLES) * 20); 
    const rul = (100 - (currentCycles / MAX_CYCLES) * 100).toFixed(1);
    const yearsRemaining = ((MAX_CYCLES - currentCycles) / 365).toFixed(1);
    document.getElementById('soh').innerText = `${soh.toFixed(1)} %`;
    document.getElementById('soh-progress').style.width = `${soh}%`;
    document.getElementById('rul-percent').innerText = `${rul} %`;
    document.getElementById('est-years').innerText = `${yearsRemaining} Tahun`;
    document.getElementById('cycle-info').innerText = `Siklus: ${currentCycles} / ${MAX_CYCLES}`;
    const statusEl = document.getElementById('op-status');
    if (temp > 30 || temp < 15) {
        statusEl.innerText = "WARNING: TEMP";
        statusEl.style.color = "#e74c3c";
    } else {
        statusEl.innerText = "STEADY";
        statusEl.style.color = "#2ecc71";
    }
}
const CONFIG = {
    voltage: { min: 300, max: 400, target: 350 },
    temp:    { min: 0,   max: 50,  low: 15, high: 30 },
    current: { min: 0,   max: 50 },
    cycles:  { total: 10000 }
};

function getPercentage(value, min, max) {
    let percent = ((value - min) / (max - min)) * 100;
    return Math.min(Math.max(percent, 0), 100);
}
const TEMP_THRESHOLD = 25;

function updateDashboard() {
    const rawTemp = 15 + (Math.random() * 15);
    const tempEl = document.getElementById('temp');
    tempEl.innerText = `${rawTemp.toFixed(1)} °C`;
    const tBar = document.getElementById('t-progress');
    const tPercent = getPercentage(rawTemp, 0, 50);
    tBar.style.width = `${tPercent}%`;
    if (rawTemp > TEMP_THRESHOLD) {
        tBar.className = 'bg-red';
        tempEl.style.color = '#e74c3c';
    } else if (rawTemp < 15) {
        tBar.className = 'bg-orange';
        tempEl.style.color = '#e67e22';
    } else {
        tBar.className = 'bg-blue';
        tempEl.style.color = '#ffffff';
    }
    const statusEl = document.getElementById('op-status');
    if (rawTemp > TEMP_THRESHOLD) {
        statusEl.innerText = "OVERHEAT ALERT";
        statusEl.style.color = "#e74c3c";
    } else {
        statusEl.innerText = "STEADY";
        statusEl.style.color = "#2ecc71";
    }
}

function updateDashboard() {
    const rawVolt = 350 + (Math.random() * 10 - 5);
    const rawTemp = 15 + (Math.random() * 20);
    const rawCurrent = 12.5 + (Math.random() * 5);
    const rawSoC = 85 - (Math.random() * 2);
    const currentCycles = 1250;
    const vPercent = getPercentage(rawVolt, CONFIG.voltage.min, CONFIG.voltage.max);
    document.getElementById('voltage').innerText = `${rawVolt.toFixed(1)} V`;
    document.getElementById('v-progress').style.width = `${vPercent}%`;
    const iPercent = getPercentage(rawCurrent, CONFIG.current.min, CONFIG.current.max);
    document.getElementById('current').innerText = `${rawCurrent.toFixed(1)} A`;
    document.getElementById('i-progress').style.width = `${iPercent}%`;
    const tPercent = getPercentage(rawTemp, CONFIG.temp.min, CONFIG.temp.max);
    const tBar = document.getElementById('t-progress');
    document.getElementById('temp').innerText = `${rawTemp.toFixed(1)} °C`;
    tBar.style.width = `${tPercent}%`;
    if (rawTemp > CONFIG.temp.high) tBar.className = 'bg-red';
    else if (rawTemp < CONFIG.temp.low) tBar.className = 'bg-orange';
    else tBar.className = 'bg-blue';
    const soh = 100 - ((currentCycles / CONFIG.cycles.total) * 20);
    const rulPercent = 100 - ((currentCycles / CONFIG.cycles.total) * 100);
    const estYears = ((CONFIG.cycles.total - currentCycles) / 365).toFixed(1);

    document.getElementById('soh').innerText = `${soh.toFixed(1)} %`;
    document.getElementById('soh-progress').style.width = `${soh}%`;
    
    document.getElementById('rul-percent').innerText = `${rulPercent.toFixed(1)} %`;
    document.getElementById('est-years').innerText = `${estYears} Tahun`;
    document.getElementById('cycle-info').innerText = `Siklus: ${currentCycles} / ${CONFIG.cycles.total}`;

    const statusEl = document.getElementById('op-status');
    if (rawTemp > 30 || rawTemp < 15) {
        statusEl.innerText = "WARNING";
        statusEl.className = "status-warning";
    } else {
        statusEl.innerText = "STEADY";
        statusEl.className = "status-steady";
    }
}

setInterval(updateDashboard, 2000);
updateDashboard();

setInterval(updateBMS, 2000);
updateBMS();