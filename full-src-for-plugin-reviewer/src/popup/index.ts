import { BrowserMessageType } from "../interfaces/message.interface";


const dropdown = document.querySelector('.dropdown');
function showGear() {
  dropdown.classList.remove('hidden')
  
}

function hideGear() {
  dropdown.classList.add('hidden')
}
dropdown.addEventListener('click', (e) => {
  dropdown.classList.toggle('open');
})




// Close dropdown if clicked outside
document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target as HTMLElement)) {
    dropdown.classList.remove('open');
  }
});

document.getElementById('download-debug').addEventListener('click', async () => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  const response = await browser.tabs.sendMessage(tabs[0].id, { type: BrowserMessageType.DEBUG })
  downloadFile('logs.txt', response)
});

function downloadFile(name: string, content: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function isExtensionOpen(): Promise<boolean> {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    const response = await browser.tabs.sendMessage(tabs[0].id, { type: BrowserMessageType.PING })
    return response === BrowserMessageType.PONG
  } catch (e) {
    return false
  }
}

isExtensionOpen().then(result => {
  console.log(result)
  if (result) showGear()
})