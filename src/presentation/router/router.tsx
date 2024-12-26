import { createBrowserRouter, Navigate } from "react-router";
import { TranslatePage } from "../pages/translate/TranslatePage";
import { ProsConsStreamPage } from "../pages/prosConssStream/ProsConsStreamPage";
import { ProsConsPage } from "../pages/prosCons/ProsConsPage";
import { OrthographyPage } from "../pages/orthography/OrthographyPage";
import { DashboardLayout } from "../layout/DashboardLayout";

export const menuRoutes = [
    {
      to: "/orthography",
      icon: "fa-solid fa-spell-check",
      title: "Ortografía",
      description: "Corregir ortografía",
      component: <OrthographyPage />
    },
    {
      to: "/pros-cons",
      icon: "fa-solid fa-code-compare",
      title: "Pros & Cons",
      description: "Comparar pros y contras",
      component: <ProsConsPage />
    },
    {
      to: "/pros-cons-stream",
      icon: "fa-solid fa-water",
      title: "Como stream",
      description: "Con stream de mensajes",
      component: <ProsConsStreamPage />
    },
    {
      to: "/translate",
      icon: "fa-solid fa-language",
      title: "Traducir",
      description: "Textos a otros idiomas",
      component: <TranslatePage />
    }
];

export const router = createBrowserRouter([
    {
        path: "/",
        element:  <DashboardLayout />,
        children: [
            ...menuRoutes.map( route => ({
                path: route.to,
                element: route.component
            })),
            {
                path: "",
                element: <Navigate to={ menuRoutes[0].to } />
            }
        ]
    }
])
