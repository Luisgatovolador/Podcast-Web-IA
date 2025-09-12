import React, { useState, useRef } from "react";
import {
  Container,
  Typography,
  Grid,
  Modal,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useTheme } from "@mui/material/styles";

// Estilo modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#2e2e2e",
  color: "#fff",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

// Función para formatear duración en mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Player de podcast
function MediaControlCard({ title, subtitle, image, audio }) {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Cuando el audio carga, obtenemos la duración
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 2,
        bgcolor: "#3e3e3e",
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, pl: 2 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {title}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#ccc" }}>
            {subtitle}
          </Typography>
          {duration > 0 && (
            <Typography variant="caption" sx={{ color: "#aaa" }}>
              Duración: {formatTime(duration)}
            </Typography>
          )}
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous" sx={{ color: "#fff" }}>
            {theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton
            aria-label="play/pause"
            sx={{ color: "#fff" }}
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <PauseIcon sx={{ height: 38, width: 38 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
          <IconButton aria-label="next" sx={{ color: "#fff" }}>
            {theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
          {/* Elemento de audio oculto */}
          <audio
            ref={audioRef}
            src={audio}
            onLoadedMetadata={handleLoadedMetadata}
          />
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
      img: process.env.PUBLIC_URL +"/mvc.png",
      description:
        "Los modelos arquitectónicos son fundamentales en el desarrollo de aplicaciones móviles, ya que permiten organizar el código de forma más clara, escalable y mantenible. Entre los más utilizados se encuentra el MVC (Model-View-Controller), que separa la lógica de negocio, la interfaz y el control de eventos, aunque puede volverse rígido en aplicaciones grandes. El MVP (Model-View-Presenter) mejora la interacción al delegar la lógica en el presentador, lo que facilita la prueba de componentes. Por su parte, el MVVM (Model-View-ViewModel) es ampliamente usado en entornos modernos como Android con Jetpack y iOS con SwiftUI, ya que permite un mayor desacoplamiento y la vinculación automática de datos. Finalmente, la Clean Architecture propone capas bien definidas (dominio, datos y presentación), lo que mejora la mantenibilidad y escalabilidad, siendo ideal para proyectos de gran envergadura.",
      podcastImage: process.env.PUBLIC_URL +"/mvc.png",
      podcastTitle: "Podcast Arquitectura Móvil 1",
      podcastAudio: process.env.PUBLIC_URL +"/Desafío_Arquitectónico__MVC__MVP__MVVM_y_Clean_Architecture_par.mp3"

    },
    {
      id: 2,
      title: "Integración con servicios en la nube",
      img: process.env.PUBLIC_URL +"/nube.png",
      description:
        "Las aplicaciones móviles modernas suelen depender de la nube para ofrecer mayor capacidad de almacenamiento, autenticación y servicios en tiempo real. Plataformas como Firebase, AWS, Azure y Google Cloud permiten a los desarrolladores integrar funciones como bases de datos, notificaciones push, servicios de autenticación y análisis de datos sin necesidad de gestionar servidores propios. La nube no solo reduce costos de infraestructura, sino que también facilita la escalabilidad y la disponibilidad de la aplicación a nivel global.",
      podcastImage: process.env.PUBLIC_URL +"/nube.png",
      podcastTitle: "Podcast Arquitectura Móvil 2",
      podcastAudio: process.env.PUBLIC_URL +"/Apps_en_la_Nube__La_Magia_Detrás_de_Tus_Aplicaciones_Favoritas.mp3"
    },
    {
      id: 3,
      title: "Uso de almacenamiento local y sincronización con la nube",
      img: process.env.PUBLIC_URL +"/nubeylocal.jpeg",
      description:
        "En muchas aplicaciones móviles es necesario almacenar datos localmente para garantizar que funcionen sin conexión a internet. Tecnologías como SQLite, Room en Android, Core Data en iOS y SharedPreferences permiten gestionar datos dentro del dispositivo. Sin embargo, cuando la aplicación vuelve a estar en línea, se requiere sincronización con la nube para mantener actualizada la información entre distintos dispositivos. Este proceso garantiza una experiencia fluida al usuario y es clave en aplicaciones como redes sociales, mensajería y plataformas de productividad.",
      podcastImage: process.env.PUBLIC_URL +"/nubeylocal.jpeg",
      podcastTitle: "Podcast Arquitectura Móvil 2",
        podcastAudio: process.env.PUBLIC_URL +"/Apps_offline_y_en_la_nube__Tu_data_siempre_contigo.mp3"
    },
    {
      id: 4,
      title: "Escalabilidad y microservicios en aplicaciones móviles modernas",
      img: process.env.PUBLIC_URL +"/microserciios.webp",
      description:
        "La escalabilidad es un requisito fundamental para las aplicaciones móviles actuales, ya que muchas de ellas deben atender a millones de usuarios de forma simultánea. Una de las soluciones más adoptadas es el uso de arquitectura de microservicios, donde las aplicaciones se dividen en módulos independientes que se comunican entre sí mediante APIs. Este enfoque permite actualizar, desplegar y mantener cada parte de la aplicación sin afectar al sistema completo. Empresas como Uber, Netflix y Spotify han adoptado este modelo, logrando manejar gran cantidad de tráfico y ofrecer nuevas funcionalidades de manera ágil.",
      podcastImage: process.env.PUBLIC_URL +"/microserciios.webp",
      podcastTitle: "Podcast Arquitectura Móvil 2",
        podcastAudio: process.env.PUBLIC_URL +"/Microservicios__El_Secreto_de_Netflix_y_Uber_para_Nunca_Colapsa.mp3"
    },
    {
      id: 5,
      title: "Retos arquitectónicos con tecnologías emergentes ",
      img: process.env.PUBLIC_URL +"/arquitecrua.png",
      description:
        "Las tecnologías emergentes presentan nuevos desafíos arquitectónicos en el desarrollo de aplicaciones móviles. En el caso de la Inteligencia Artificial (IA), la integración de chatbots, reconocimiento de voz e imagen requiere gran capacidad de procesamiento, lo que obliga a combinar procesamiento en la nube y en el dispositivo. Con el Internet de las Cosas (IoT), la arquitectura debe permitir la comunicación eficiente entre múltiples dispositivos inteligentes, garantizando seguridad y estabilidad en la transmisión de datos. Finalmente, la realidad aumentada (AR) demanda arquitecturas optimizadas para manejar gráficos avanzados y sensores en tiempo real, lo que representa un reto en términos de rendimiento, consumo de batería y experiencia de usuario.",
      podcastImage: process.env.PUBLIC_URL +"/arquitecrua.png",
      podcastTitle: "Podcast Arquitectura Móvil 2",
        podcastAudio: process.env.PUBLIC_URL +"/El_Reto_Arquitectónico__IA__IoT_y_AR_Redefiniendo_las_Apps_Móvi.mp3"
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
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#2e2e2e" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Podcast Web IA - Arquitectura Móvil
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenedor principal */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ color: "#0a0a0aff" }}
        >
          Arquitectura de Aplicaciones Móviles
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {cards.map((card) => (
            <Grid
              item
              key={card.id}
              xs={12}
              sm={6}
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{
                  width: 400,
                  height: 350,
                  backgroundColor: "#4a4a4a",
                  borderRadius: "16px",
                  boxShadow: 5,
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                  color: "#fff",
                }}
              >
                <CardActionArea onClick={() => handleOpen(card)}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={card.img}
                    alt={card.title}
                    sx={{
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      objectFit: "cover",
                      height: 180,
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      align="center"
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#ccc" }}
                      align="justify"
                    >
                      {card.description.substring(0, 50)}...
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
              <Typography variant="h5" gutterBottom>
                {selectedCard.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedCard.description}
              </Typography>
              <MediaControlCard
                title={selectedCard.podcastTitle}
                subtitle="Podcast"
                image={selectedCard.podcastImage}
                audio={selectedCard.podcastAudio}
              />
            </>
          )}
        </Box>
      </Modal>

      {/* Footer */}
      <Box sx={{ bgcolor: "#2e2e2e", py: 3, mt: 6 }}>
        <Typography variant="body2" color="#ccc" align="center">
          © 2025 Podcast Web IA. Todos los derechos reservados.
        </Typography>
      </Box>
    </>
  );
}