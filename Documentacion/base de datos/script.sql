USE [iCrash]
GO
/****** Object:  User [icrash]    Script Date: 29/11/2022 08:46:17 p. m. ******/
CREATE USER [icrash] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [iCrashUser]    Script Date: 29/11/2022 08:46:17 p. m. ******/
CREATE USER [iCrashUser] FOR LOGIN [iCrashUser] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [icrash]
GO
ALTER ROLE [db_owner] ADD MEMBER [iCrashUser]
GO
/****** Object:  Table [dbo].[Cobertura]    Script Date: 29/11/2022 08:46:17 p. m. ******/
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
/****** Object:  Table [dbo].[Conductor]    Script Date: 29/11/2022 08:46:18 p. m. ******/
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
/****** Object:  Table [dbo].[Dictamen]    Script Date: 29/11/2022 08:46:18 p. m. ******/
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
/****** Object:  Table [dbo].[Empleado]    Script Date: 29/11/2022 08:46:18 p. m. ******/
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
/****** Object:  Table [dbo].[EntidadFederativa]    Script Date: 29/11/2022 08:46:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EntidadFederativa](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clave] [int] NOT NULL,
	[nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_EntidadFederativa] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [clave_unq] UNIQUE NONCLUSTERED 
(
	[clave] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Imagen]    Script Date: 29/11/2022 08:46:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Imagen](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idReporteSiniestro] [int] NOT NULL,
	[urlImagen] [varchar](max) NOT NULL,
 CONSTRAINT [PK_imagen] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Involucrado]    Script Date: 29/11/2022 08:46:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Involucrado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[idReporteSiniestro] [int] NOT NULL,
	[idVehiculo] [int] NULL,
 CONSTRAINT [PK_involucrado] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Marca]    Script Date: 29/11/2022 08:46:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Marca](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Marca] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Municipio]    Script Date: 29/11/2022 08:46:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Municipio](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clave] [int] NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[idEntidadFederativa] [int] NOT NULL,
 CONSTRAINT [PK_Municipio] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [Municipio_EntidadFederativa] UNIQUE NONCLUSTERED 
(
	[clave] ASC,
	[idEntidadFederativa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Plazo]    Script Date: 29/11/2022 08:46:18 p. m. ******/
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
/****** Object:  Table [dbo].[Poliza]    Script Date: 29/11/2022 08:46:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Poliza](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[precioFinal] [float] NOT NULL,
	[idConductor] [int] NOT NULL,
	[idPlazo] [int] NOT NULL,
	[idCobertura] [int] NOT NULL,
 CONSTRAINT [PK_Poliza] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReporteSiniestro]    Script Date: 29/11/2022 08:46:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReporteSiniestro](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[estatus] [varchar](50) NOT NULL,
	[fecha] [date] NOT NULL,
	[idMunicipio] [int] NOT NULL,
	[latitud] [float] NOT NULL,
	[longitud] [float] NOT NULL,
	[idPoliza] [int] NOT NULL,
	[idEmpleado] [int] NULL,
 CONSTRAINT [PK_ReporteSiniestro] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 29/11/2022 08:46:18 p. m. ******/
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
/****** Object:  Table [dbo].[Vehiculo]    Script Date: 29/11/2022 08:46:18 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehiculo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[año] [int] NOT NULL,
	[color] [varchar](50) NOT NULL,
	[idMarca] [int] NOT NULL,
	[modelo] [varchar](50) NOT NULL,
	[numPlacas] [varchar](10) NOT NULL,
	[numSerie] [varchar](20) NOT NULL,
	[idPoliza] [int] NULL,
 CONSTRAINT [PK_Vehiculo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Usuario] ADD  DEFAULT ((1)) FOR [estado]
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
ALTER TABLE [dbo].[Imagen]  WITH CHECK ADD  CONSTRAINT [FK_imagen_ReporteSiniestro] FOREIGN KEY([idReporteSiniestro])
REFERENCES [dbo].[ReporteSiniestro] ([id])
GO
ALTER TABLE [dbo].[Imagen] CHECK CONSTRAINT [FK_imagen_ReporteSiniestro]
GO
ALTER TABLE [dbo].[Involucrado]  WITH CHECK ADD  CONSTRAINT [FK_involucrado_ReporteSiniestro] FOREIGN KEY([idReporteSiniestro])
REFERENCES [dbo].[ReporteSiniestro] ([id])
GO
ALTER TABLE [dbo].[Involucrado] CHECK CONSTRAINT [FK_involucrado_ReporteSiniestro]
GO
ALTER TABLE [dbo].[Involucrado]  WITH CHECK ADD  CONSTRAINT [FK_Involucrado_Vehiculo] FOREIGN KEY([idVehiculo])
REFERENCES [dbo].[Vehiculo] ([id])
GO
ALTER TABLE [dbo].[Involucrado] CHECK CONSTRAINT [FK_Involucrado_Vehiculo]
GO
ALTER TABLE [dbo].[Municipio]  WITH CHECK ADD  CONSTRAINT [FK_Municipio_Municipio] FOREIGN KEY([idEntidadFederativa])
REFERENCES [dbo].[EntidadFederativa] ([id])
GO
ALTER TABLE [dbo].[Municipio] CHECK CONSTRAINT [FK_Municipio_Municipio]
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
ALTER TABLE [dbo].[ReporteSiniestro]  WITH CHECK ADD  CONSTRAINT [FK_ReporteSiniestro_Municipio] FOREIGN KEY([idMunicipio])
REFERENCES [dbo].[Municipio] ([id])
GO
ALTER TABLE [dbo].[ReporteSiniestro] CHECK CONSTRAINT [FK_ReporteSiniestro_Municipio]
GO
ALTER TABLE [dbo].[ReporteSiniestro]  WITH CHECK ADD  CONSTRAINT [FK_ReporteSiniestro_Poliza] FOREIGN KEY([idPoliza])
REFERENCES [dbo].[Poliza] ([id])
GO
ALTER TABLE [dbo].[ReporteSiniestro] CHECK CONSTRAINT [FK_ReporteSiniestro_Poliza]
GO
ALTER TABLE [dbo].[Vehiculo]  WITH CHECK ADD  CONSTRAINT [FK_Vehiculo_Marca] FOREIGN KEY([idMarca])
REFERENCES [dbo].[Marca] ([id])
GO
ALTER TABLE [dbo].[Vehiculo] CHECK CONSTRAINT [FK_Vehiculo_Marca]
GO
ALTER TABLE [dbo].[Vehiculo]  WITH CHECK ADD  CONSTRAINT [FK_Vehiculo_Poliza] FOREIGN KEY([idPoliza])
REFERENCES [dbo].[Poliza] ([id])
GO
ALTER TABLE [dbo].[Vehiculo] CHECK CONSTRAINT [FK_Vehiculo_Poliza]
GO
