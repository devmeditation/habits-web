export function notificationPush(body: string, icon: string) {
  window.Notification.requestPermission((permission) => {
    if (permission === "granted") {
      const notification = new window.Notification("Habits", {
        body,
        icon,
      });
      return notification;
    }

    return alert(
      "Olá! fornessa permissão no seu navegador para que o Habits possa lhe informar sobre seus hábitos do dia ainda não concluidos. :)"
    );
  });
}
