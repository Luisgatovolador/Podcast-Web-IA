import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Modal,
  Box,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useTheme } from "@mui/material/styles";

// Estilo modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 700,
  bgcolor: "#5e42f5", // lila oscuro
  color: "#e0f7fa",   // verde muy claro para el texto
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  outline: "none",
};

// Player de podcast
function MediaControlCard({ title, subtitle, image }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 2,
        bgcolor: "#8e24aa", // lila vibrante
        color: "#e0f7fa",   // verde muy claro
        borderRadius: 2,
        boxShadow: 6,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, pl: 2 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {title}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#b2dfdb" }}>
            {subtitle}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous" sx={{ color: "#e0f7fa" }}>
            {theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause" sx={{ color: "#e0f7fa" }}>
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next" sx={{ color: "#e0f7fa" }}>
            {theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: "cover" }}
        image={image}
        alt={title}
      />
    </Card>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: "Modelos arquitectónicos más comunes",
      img: "IMAGEN_IA_1.png",
      description:
        "Los modelos arquitectónicos son fundamentales en el desarrollo de aplicaciones móviles, ya que permiten organizar el código de forma más clara, escalable y mantenible. Entre los más utilizados se encuentra el MVC (Model-View-Controller), que separa la lógica de negocio, la interfaz y el control de eventos, aunque puede volverse rígido en aplicaciones grandes. El MVP (Model-View-Presenter) mejora la interacción al delegar la lógica en el presentador, lo que facilita la prueba de componentes. Por su parte, el MVVM (Model-View-ViewModel) es ampliamente usado en entornos modernos como Android con Jetpack y iOS con SwiftUI, ya que permite un mayor desacoplamiento y la vinculación automática de datos. Finalmente, la Clean Architecture propone capas bien definidas (dominio, datos y presentación), lo que mejora la mantenibilidad y escalabilidad, siendo ideal para proyectos de gran envergadura.",
      podcastImage: "IMAGEN_PODCAST_1.png",
      podcastTitle: "Podcast Arquitectura Móvil 1",
    },
    {
      id: 2,
      title: "Integración con servicios en la nube",
      img: "IMAGEN_IA_2.png",
      description:
        "Las aplicaciones móviles modernas suelen depender de la nube para ofrecer mayor capacidad de almacenamiento, autenticación y servicios en tiempo real. Plataformas como Firebase, AWS, Azure y Google Cloud permiten a los desarrolladores integrar funciones como bases de datos, notificaciones push, servicios de autenticación y análisis de datos sin necesidad de gestionar servidores propios. La nube no solo reduce costos de infraestructura, sino que también facilita la escalabilidad y la disponibilidad de la aplicación a nivel global.",
      podcastImage: "IMAGEN_PODCAST_2.png",
      podcastTitle: "Podcast Arquitectura Móvil 2",
    },
    {
      id: 3,
      title: "Uso de almacenamiento local y sincronización con la nube",
      img: "IMAGEN_IA_3.png",
      description:
        "En muchas aplicaciones móviles es necesario almacenar datos localmente para garantizar que funcionen sin conexión a internet. Tecnologías como SQLite, Room en Android, Core Data en iOS y SharedPreferences permiten gestionar datos dentro del dispositivo. Sin embargo, cuando la aplicación vuelve a estar en línea, se requiere sincronización con la nube para mantener actualizada la información entre distintos dispositivos. Este proceso garantiza una experiencia fluida al usuario y es clave en aplicaciones como redes sociales, mensajería y plataformas de productividad.",
      podcastImage: "IMAGEN_PODCAST_3.png",
      podcastTitle: "Podcast Arquitectura Móvil 3",
    },
    {
      id: 4,
      title: "Escalabilidad y microservicios en aplicaciones móviles modernas",
      img: "IMAGEN_IA_4.png",
      description:
        "La escalabilidad es un requisito fundamental para las aplicaciones móviles actuales, ya que muchas de ellas deben atender a millones de usuarios de forma simultánea. Una de las soluciones más adoptadas es el uso de arquitectura de microservicios, donde las aplicaciones se dividen en módulos independientes que se comunican entre sí mediante APIs. Este enfoque permite actualizar, desplegar y mantener cada parte de la aplicación sin afectar al sistema completo. Empresas como Uber, Netflix y Spotify han adoptado este modelo, logrando manejar gran cantidad de tráfico y ofrecer nuevas funcionalidades de manera ágil.",
      podcastImage: "IMAGEN_PODCAST_4.png",
      podcastTitle: "Podcast Arquitectura Móvil 4",
    },
    {
      id: 5,
      title: "Retos arquitectónicos con tecnologías emergentes",
      img: "IMAGEN_IA_5.png",
      description:
        "Las tecnologías emergentes presentan nuevos desafíos arquitectónicos en el desarrollo de aplicaciones móviles. En el caso de la Inteligencia Artificial (IA), la integración de chatbots, reconocimiento de voz e imagen requiere gran capacidad de procesamiento, lo que obliga a combinar procesamiento en la nube y en el dispositivo. Con el Internet de las Cosas (IoT), la arquitectura debe permitir la comunicación eficiente entre múltiples dispositivos inteligentes, garantizando seguridad y estabilidad en la transmisión de datos. Finalmente, la realidad aumentada (AR) demanda arquitecturas optimizadas para manejar gráficos avanzados y sensores en tiempo real, lo que representa un reto en términos de rendimiento, consumo de batería y experiencia de usuario.",
      podcastImage: "IMAGEN_PODCAST_5.png",
      podcastTitle: "Podcast Arquitectura Móvil 5",
    },
  ];

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
      {/* Navbar con verdes y lilas */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #43a047, #7e57c2)", // verde a lila
          boxShadow: 4,
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Podcast Web IA - Arquitectura Móvil
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenedor principal */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 800, mb: 6, color: "#1de9b6" }} // verde claro
        >
          Arquitectura de Aplicaciones Móviles
        </Typography>

        {/* Grid de cards modernas */}
        <Grid container spacing={4} justifyContent="center">
          {cards.map((card) => (
            <Grid
              item
              key={card.id}
              xs={12}
              sm={6}
              md={4}
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{
                  width: 380,
                  height: 350,
                  borderRadius: 3,
                  boxShadow: 5,
                  overflow: "hidden",
                  color: "#fff",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.3s ease",
                  background: "linear-gradient(180deg, #7e57c2, #43a047)", // lila a verde
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                  },
                }}
              >
                <CardActionArea onClick={() => handleOpen(card)}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={card.img}
                    alt={card.title}
                  />
                  <CardContent
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      bgcolor: "rgba(0,0,0,0.5)",
                      py: 1.5,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {card.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal con player */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {selectedCard && (
            <>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 700, mb: 2 }}
              >
                {selectedCard.title}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                {selectedCard.description}
              </Typography>
              <MediaControlCard
                title={selectedCard.podcastTitle}
                subtitle="Podcast"
                image={selectedCard.podcastImage}
              />
            </>
          )}
        </Box>
      </Modal>

      {/* Footer */}
      <Box sx={{ bgcolor: "#43a047", py: 3, mt: 6 }}>
        <Typography variant="body2" color="#fff" align="center">
          © 2025 Podcast Web IA. Todos los derechos reservados.
        </Typography>
      </Box>
    </>
  );
}
