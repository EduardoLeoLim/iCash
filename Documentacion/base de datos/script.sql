USE [master]
GO
/****** Object:  Database [iCrash]    Script Date: 15/11/2022 07:19:07 p. m. ******/
CREATE DATABASE [iCrash]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'iCrash', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\iCrash.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'iCrash_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\iCrash_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [iCrash] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [iCrash].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [iCrash] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [iCrash] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [iCrash] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [iCrash] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [iCrash] SET ARITHABORT OFF 
GO
ALTER DATABASE [iCrash] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [iCrash] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [iCrash] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [iCrash] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [iCrash] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [iCrash] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [iCrash] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [iCrash] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [iCrash] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [iCrash] SET  DISABLE_BROKER 
GO
ALTER DATABASE [iCrash] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [iCrash] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [iCrash] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [iCrash] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [iCrash] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [iCrash] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [iCrash] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [iCrash] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [iCrash] SET  MULTI_USER 
GO
ALTER DATABASE [iCrash] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [iCrash] SET DB_CHAINING OFF 
GO
ALTER DATABASE [iCrash] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [iCrash] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [iCrash] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [iCrash] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [iCrash] SET QUERY_STORE = OFF
GO
USE [iCrash]
GO
/****** Object:  Table [dbo].[Cobertura]    Script Date: 15/11/2022 07:19:07 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cobertura](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[precio] [float] NOT NULL,
	[tipo] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Cobertura] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Conductor]    Script Date: 15/11/2022 07:19:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Conductor](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[correo] [varchar](100) NOT NULL,
	[numLicencia] [varchar](10) NOT NULL,
	[idUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Conductor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dictamen]    Script Date: 15/11/2022 07:19:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dictamen](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[folio] [varchar](50) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[descripcion] [varchar](256) NOT NULL,
	[idReporteSinestro] [int] NOT NULL,
 CONSTRAINT [PK_Dictamen] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empleado]    Script Date: 15/11/2022 07:19:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cargo] [varchar](20) NOT NULL,
	[idUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Empleado] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[imagen]    Script Date: 15/11/2022 07:19:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[imagen](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idReporteSiniestro] [int] NOT NULL,
	[urlImagen] [varchar](max) NOT NULL,
 CONSTRAINT [PK_imagen] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[involucrado]    Script Date: 15/11/2022 07:19:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[involucrado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[color] [varchar](50) NULL,
	[marca] [varchar](50) NULL,
	[modelo] [varchar](50) NULL,
	[nombre] [varchar](50) NOT NULL,
	[numeroPlacas] [varchar](10) NULL,
	[idReporteSiniestro] [int] NOT NULL,
 CONSTRAINT [PK_involucrado] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Plazo]    Script Date: 15/11/2022 07:19:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Plazo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[duracion] [int] NULL,
	[nombre] [varchar](50) NULL,
	[precio] [float] NULL,
 CONSTRAINT [PK_Plazo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Poliza]    Script Date: 15/11/2022 07:19:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Poliza](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[precioFinal] [int] NOT NULL,
	[idConductor] [int] NOT NULL,
	[idPlazo] [int] NOT NULL,
	[idCobertura] [int] NOT NULL,
 CONSTRAINT [PK_Poliza] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReporteSiniestro]    Script Date: 15/11/2022 07:19:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReporteSiniestro](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[ciudad] [varchar](50) NOT NULL,
	[estatus] [varchar](50) NOT NULL,
	[fecha] [date] NOT NULL,
	[latitud] [varchar](50) NOT NULL,
	[longitud] [varchar](50) NOT NULL,
	[idPoliza] [int] NOT NULL,
	[idEmpleado] [int] NULL,
 CONSTRAINT [PK_ReporteSiniestro] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 15/11/2022 07:19:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellidoPaterno] [varchar](50) NOT NULL,
	[apellidoMaterno] [varchar](50) NOT NULL,
	[nombreUsuario] [varchar](50) NOT NULL,
	[claveAcceso] [varchar](50) NOT NULL,
	[estado] [int] NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehiculo]    Script Date: 15/11/2022 07:19:08 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehiculo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[anio] [varchar](4) NOT NULL,
	[color] [varchar](50) NOT NULL,
	[modelo] [varchar](50) NOT NULL,
	[numPlacas] [varchar](10) NOT NULL,
	[numSerie] [varchar](20) NOT NULL,
	[idPoliza] [int] NOT NULL,
 CONSTRAINT [PK_Vehiculo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Conductor]  WITH CHECK ADD  CONSTRAINT [FK_Conductor_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([id])
GO
ALTER TABLE [dbo].[Conductor] CHECK CONSTRAINT [FK_Conductor_Usuario]
GO
ALTER TABLE [dbo].[Dictamen]  WITH CHECK ADD  CONSTRAINT [FK_Dictamen_ReporteSiniestro] FOREIGN KEY([idReporteSinestro])
REFERENCES [dbo].[ReporteSiniestro] ([id])
GO
ALTER TABLE [dbo].[Dictamen] CHECK CONSTRAINT [FK_Dictamen_ReporteSiniestro]
GO
ALTER TABLE [dbo].[Empleado]  WITH CHECK ADD  CONSTRAINT [FK_Empleado_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([id])
GO
ALTER TABLE [dbo].[Empleado] CHECK CONSTRAINT [FK_Empleado_Usuario]
GO
ALTER TABLE [dbo].[imagen]  WITH CHECK ADD  CONSTRAINT [FK_imagen_ReporteSiniestro] FOREIGN KEY([idReporteSiniestro])
REFERENCES [dbo].[ReporteSiniestro] ([id])
GO
ALTER TABLE [dbo].[imagen] CHECK CONSTRAINT [FK_imagen_ReporteSiniestro]
GO
ALTER TABLE [dbo].[involucrado]  WITH CHECK ADD  CONSTRAINT [FK_involucrado_ReporteSiniestro] FOREIGN KEY([idReporteSiniestro])
REFERENCES [dbo].[ReporteSiniestro] ([id])
GO
ALTER TABLE [dbo].[involucrado] CHECK CONSTRAINT [FK_involucrado_ReporteSiniestro]
GO
ALTER TABLE [dbo].[Poliza]  WITH CHECK ADD  CONSTRAINT [FK_Poliza_Cobertura] FOREIGN KEY([idCobertura])
REFERENCES [dbo].[Cobertura] ([id])
GO
ALTER TABLE [dbo].[Poliza] CHECK CONSTRAINT [FK_Poliza_Cobertura]
GO
ALTER TABLE [dbo].[Poliza]  WITH CHECK ADD  CONSTRAINT [FK_Poliza_Conductor] FOREIGN KEY([idConductor])
REFERENCES [dbo].[Conductor] ([id])
GO
ALTER TABLE [dbo].[Poliza] CHECK CONSTRAINT [FK_Poliza_Conductor]
GO
ALTER TABLE [dbo].[Poliza]  WITH CHECK ADD  CONSTRAINT [FK_Poliza_Plazo] FOREIGN KEY([idPlazo])
REFERENCES [dbo].[Plazo] ([id])
GO
ALTER TABLE [dbo].[Poliza] CHECK CONSTRAINT [FK_Poliza_Plazo]
GO
ALTER TABLE [dbo].[ReporteSiniestro]  WITH CHECK ADD  CONSTRAINT [FK_ReporteSiniestro_Empleado] FOREIGN KEY([idEmpleado])
REFERENCES [dbo].[Empleado] ([id])
GO
ALTER TABLE [dbo].[ReporteSiniestro] CHECK CONSTRAINT [FK_ReporteSiniestro_Empleado]
GO
ALTER TABLE [dbo].[ReporteSiniestro]  WITH CHECK ADD  CONSTRAINT [FK_ReporteSiniestro_Poliza] FOREIGN KEY([idPoliza])
REFERENCES [dbo].[Poliza] ([id])
GO
ALTER TABLE [dbo].[ReporteSiniestro] CHECK CONSTRAINT [FK_ReporteSiniestro_Poliza]
GO
ALTER TABLE [dbo].[Vehiculo]  WITH CHECK ADD  CONSTRAINT [FK_Vehiculo_Poliza] FOREIGN KEY([idPoliza])
REFERENCES [dbo].[Poliza] ([id])
GO
ALTER TABLE [dbo].[Vehiculo] CHECK CONSTRAINT [FK_Vehiculo_Poliza]
GO
USE [master]
GO
ALTER DATABASE [iCrash] SET  READ_WRITE 
GO
