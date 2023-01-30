import { api } from "./lib/axios";
import { Home } from "./pages/Home/Home";

navigator.serviceWorker.register('/habits-sw.js')
  .then(async serviceWorker => {
    let subscription = await serviceWorker.pushManager.getSubscription()

    if (!subscription) {
      const publicKeyResponse = await api.get('/push/public_key')

      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyResponse.data.publicKey,
      })
    }

    await api.post('/push/register', {
      subscription,
    })

    await api.post('/push/send', {
      subscription,
    })
  })

export function App() {
  return (
   <>
      <Home />
   </>
  );
}

