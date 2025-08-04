const boxes = document.querySelectorAll('.box');
const refreshBtn = document.getElementById('refreshBtn');
const selectedTextEl = document.getElementById('selectedText');

const messages = [
  'AIM',
  'D การดำเนินงานตามกลยุทธ์',
  'R การรับผิดชอบต่อผลลัพธ์',
  'I(DRIVE) การสร้างแรงบันดาลใจและพัฒนาผู้อื่น',
  'V การสร้างประโยชน์ผ่านเครือข่ายที่แข็งแกร่ง',
  'E การนำดิจิทัลมาใช้เพื่อพัฒนา',
  'DRIVE',
  'DEI&B',
  'A ยืดหยุ่น คล่องตัว',
  'A กล้าแสดงความเห็น แสวงหาโอกาส',
  'I(AIM) ซื่อสัตย์ ซื่อตรง',
  'I(AIM) โปร่งใส',
  'M ใส่ใจลูกค้า',
  'M คิดใหม่ ทำใหม่',
  'M ยึดมั่นความปลอดภัย',
];

// เก็บสถานะข้อความที่เปิดแล้วในกล่อง (index => message)
let openedMessages = new Array(boxes.length).fill(null);

// เก็บข้อความที่ยังไม่ได้ใช้
let unusedMessages = [...messages];

// ตั้งค่ากล่องเริ่มต้นเป็นปริศนา (ซ่อนข้อความ)
function initBoxes() {
  boxes.forEach((box, index) => {
    box.textContent = (index + 1).toString(); // เปลี่ยนจาก '?' เป็นเลข 1-9
    box.classList.add('hidden');
    box.classList.remove('selected');
  });
  openedMessages.fill(null);
  unusedMessages = [...messages];
  selectedTextEl.textContent = 'ยังไม่เลือก';
}


// ฟังก์ชันสุ่มข้อความที่ยังไม่ถูกใช้
function getRandomUnusedMessage() {
  if (unusedMessages.length === 0) return null;
  const idx = Math.floor(Math.random() * unusedMessages.length);
  const msg = unusedMessages.splice(idx, 1)[0];
  return msg;
}

// คลิกกล่องเพื่อเปิดข้อความ (ถ้ายังไม่เปิด)
boxes.forEach((box, idx) => {
  box.addEventListener('click', () => {
    // ถ้าเปิดแล้ว ไม่ต้องสุ่มใหม่ ให้แสดงข้อความนั้นเลย
    if (openedMessages[idx] !== null) {
      selectBox(idx);
      return;
    }
    // ถ้ายังไม่มีข้อความ ให้สุ่มข้อความใหม่มาใส่
    const msg = getRandomUnusedMessage();
    if (msg !== null) {
      openedMessages[idx] = msg;
      box.textContent = msg;
      box.classList.remove('hidden');
      selectBox(idx);
    } else {
      // ถ้าข้อความหมดแล้ว ไม่สามารถเปิดเพิ่มได้
      alert('เปิดครบทุกกล่องแล้ว!');
    }
  });
});

// ฟังก์ชันเน้นกล่องที่เลือก พร้อมโชว์ข้อความ
function selectBox(index) {
  boxes.forEach((b,i) => b.classList.toggle('selected', i === index));
  if (openedMessages[index] !== null) {
    selectedTextEl.textContent = openedMessages[index];
  } else {
    selectedTextEl.textContent = 'ยังไม่เลือก';
  }
}

// ปุ่มรีเฟรชซ่อนข้อความทั้งหมด เริ่มเกมใหม่
refreshBtn.addEventListener('click', () => {
  initBoxes();
});

// เริ่มต้นเกม
initBoxes();
