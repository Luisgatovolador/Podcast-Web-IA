import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  AppBar,
  Toolbar,
  Modal,
  Box,
  Button
} from "@mui/material";

// Estilo para el modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  // Estado para controlar el modal
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Datos de las cards
  const cards = [
    {
      id: 1,
      title: "Modelo MVC aplicado en móviles",
      img: "IMAGEN_IA_1.png",
      description:
        "El patrón MVC separa la lógica de negocio (Model), la interfaz de usuario (View) y el control de eventos (Controller). Es una de las arquitecturas más clásicas.",
      podcast: "AQUI_VA_EL_LINK_DEL_PODCAST",
    },
    {
      id: 2,
      title: "Sincronización local y nube",
      img: "IMAGEN_IA_2.png",
      description:
        "El almacenamiento local combinado con sincronización en la nube permite a las apps funcionar offline y actualizar datos automáticamente cuando recuperan conexión.",
      podcast: "AQUI_VA_EL_LINK_DEL_PODCAST",
    },
  ];

  // Funciones de abrir/cerrar modal
  const handleOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  return (
    <>
      {/* Barra superior */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Podcast Web IA - Arquitectura Móvil
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenedor principal */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Título */}
        <Typography variant="h3" align="center" gutterBottom>
          Arquitectura de Aplicaciones Móviles
        </Typography>

        {/* Podcast general */}
        <Card sx={{ mb: 4, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              🎧 Escucha el Podcast General
            </Typography>
            <iframe
              src="AQUI_VA_EL_LINK_DEL_PODCAST"
              width="100%"
              height="150"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              title="Podcast General"
            ></iframe>
          </CardContent>
        </Card>

        {/* Descripción */}
        <Card sx={{ mb: 4, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              📖 Descripción
            </Typography>
            <Typography variant="body1" paragraph>
              Esta página presenta un resumen sobre la arquitectura de aplicaciones móviles, 
              incluyendo los modelos arquitectónicos más comunes, la integración con la nube 
              y los retos con tecnologías emergentes como IA, IoT y realidad aumentada.
            </Typography>

            <Typography variant="h5" gutterBottom>
              💡 Reflexiones
            </Typography>
            <Typography variant="body1">
              La arquitectura de aplicaciones móviles es clave para garantizar 
              escalabilidad, rendimiento y experiencia de usuario. El uso de 
              modelos como MVVM o Clean Architecture permite un desarrollo más 
              ordenado, mientras que la integración con la nube y microservicios 
              asegura un crecimiento sostenible.
            </Typography>
          </CardContent>
        </Card>

        {/* Galería de imágenes IA */}
        <Typography variant="h5" gutterBottom>
          🖼️ Diagramas de Arquitectura Móvil
        </Typography>
        <Grid container spacing={2}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} key={card.id}>
              <Card
                sx={{ boxShadow: 3, cursor: "pointer" }}
                onClick={() => handleOpen(card)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={card.img}
                  alt={card.title}
                />
                <CardContent>
                  <Typography align="center" variant="body2">
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal dinámico */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {selectedCard && (
            <>
              <Typography variant="h5" gutterBottom>
                {selectedCard.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedCard.description}
              </Typography>
              {/* Botón para reproducir podcast */}
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  window.open(selectedCard.podcast, "_blank")
                }
              >
                🎧 Reproducir Podcast
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
