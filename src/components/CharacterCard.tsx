import { Character } from "@models/Character";
import React from "react";

interface Props {
  character: Character;
}

export default function CharacterCard(props: Props) {
  const { character } = props;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative border border-gray-300">
      <img
        src={character.attributes.image.small}
        className="w-full object-cover"
        alt={character.attributes.canonicalName}
      />
      <div className="absolute w-full py-2.5 bottom-0 inset-x-0 bg-gray-900 opacity-70 hover:opacity-100 text-white text-xs text-center leading-4">
        <p className="text-md">{character.attributes.canonicalName}</p>
      </div>
    </div>
  );
}
