import type { Metadata } from "next";
import CasinoExperience from "../CasinoExperience";
export const metadata: Metadata = { title: "Game Lobby — FBets Club", description: "Explore 24 original FBets virtual casino game experiences." };
export default function CasinoLobbyPage(){ return <CasinoExperience lobby/>; }
