import App from '../client/schemas/app';

export default function(app: App) {
  app.on('connection', (connection) => {
    app.channel('anonymous').join(connection);
  });

  app.on('login', (payload, { connection }) => {
    if (!connection) return;

    const { user } = connection;

    // The connection is no longer anonymous, remove it
    app.channel('anonymous').leave(connection);

    // Add it to the authenticated user channel
    app.channel('authenticated').join(connection);

    // Channels can be named anything and joined on any condition
    // E.g. to send real-time events only to admins use

    // if(user.isAdmin) { app.channel('admins').join(connection); }

    // If the user has joined e.g. chat rooms

    // user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(connection))
  });

  // A global publisher that sends all events to all authenticated clients
  app.publish((data, context) => {
    return app.channel('authenticated');
  });
}
