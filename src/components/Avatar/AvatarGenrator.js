import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Avatar from "avataaars";

const AvatarGenrator = ({ avatar, getAvatar }) => {
  const topArray = [
    "NoHair",
    "Eyepatch",
    "Hat",
    "Turban",
    "WinterHat1",
    "WinterHat2",
    "WinterHat3",
    "WinterHat4",
    "LongHairBigHair",
    "LongHairBob",
    "LongHairBun",
    "LongHairCurly",
    "LongHairCurvy",
    "LongHairDreads",
    "LongHairFrida",
    "LongHairFro",
    "LongHairFroBand",
    "LongHairNotTooLong",
    "LongHairShavedSides",
    "LongHairMiaWallace",
    "LongHairStraight",
    "LongHairStraight2",
    "LongHairStraightStrand",
    "ShortHairDreads01",
    "ShortHairDreads02",
    "ShortHairFrizzle",
    "ShortHairShaggyMullet",
    "ShortHairShortCurly",
    "ShortHairShortFlat",
    "ShortHairShortRound",
    "ShortHairShortWaved",
    "ShortHairSides",
    "ShortHairTheCaesar",
    "ShortHairTheCaesarSidePart",
  ];
  const AccessoriesArray = [
    "Blank",
    "Kurt",
    "Prescription01",
    "Prescription02",
    "Round",
    "Sunglasses",
    "Wayfarers",
  ];
  const HairColorArray = [
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "PastelPink",
    "Blue",
    "Platinum",
    "Red",
    "SilverGray",
  ];
  const FacialHairArray = [
    "Blank",
    "BeardMedium",
    "BeardLight",
    "BeardMajestic",
    "MoustacheFancy",
    "MoustacheMagnum",
  ];
  const FacialHairColorArray = [
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "Platinum",
    "Red",
  ];
  const ClothesArray = [
    "BlazerShirt",
    "BlazerSweater",
    "CollarSweater",
    "GraphicShirt",
    "Hoodie",
    "Overall",
    "ShirtCrewNeck",
    "ShirtScoopNeck",
    "ShirtVNeck",
  ];
  const FabricArray = [
    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White",
  ];
  const GraphicArray = [
    "Bat",
    "Cumbia",
    "Deer",
    "Diamond",
    "Hola",
    "Pizza",
    "Resist",
    "Selena",
    "Bear",
    "SkullOutline",
    "Skull",
  ];
  const EyesArray = [
    "Close",
    "Cry",
    "Default",
    "Dizzy",
    "EyeRoll",
    "Happy",
    "Hearts",
    "Side",
    "Squint",
    "Surprised",
    "Wink",
    "WinkWacky",
  ];
  const EyebrowArray = [
    "Angry",
    "AngryNatural",
    "Default",
    "DefaultNatural",
    "FlatNatural",
    "RaisedExcited",
    "RaisedExcitedNatural",
    "SadConcerned",
    "SadConcernedNatural",
    "UnibrowNatural",
    "UpDown",
    "UpDownNatural",
  ];
  const MouthArray = [
    "Concerned",
    "Default",
    "Disbelief",
    "Eating",
    "Grimace",
    "Sad",
    "ScreamOpen",
    "Serious",
    "Smile",
    "Tongue",
    "Twinkle",
    "Vomit",
  ];
  const SkinArray = [
    "Tanned",
    "Yellow",
    "Pale",
    "Light",
    "Brown",
    "DarkBrown",
    "Black",
  ];

  const [top, setTop] = useState(avatar.topType);
  const [Accessories, setAccessories] = useState(avatar.accessoriesType);
  const [HairColor, setHairColor] = useState(avatar.hairColor);
  const [FacialHair, setFacialHair] = useState(avatar.facialHairType);
  const [FacialHairColor, setFacialHairColor] = useState(
    avatar.facialHairColor
  );
  const [Clothes, setClothes] = useState(avatar.clotheType);
  const [Fabric, setFabric] = useState(avatar.clotheColor);
  const [Graphic, setGraphic] = useState(avatar.graphicType);
  const [Eyes, setEyes] = useState(avatar.eyeType);
  const [Eyebrow, setEyebrow] = useState(avatar.eyebrowType);
  const [Mouth, setMouth] = useState(avatar.mouthType);
  const [Skin, setSkin] = useState(avatar.skinColor);

  const randomAvatar = () => {
    setTop(topArray[Math.floor(Math.random() * topArray.length)]);
    setAccessories(
      AccessoriesArray[Math.floor(Math.random() * AccessoriesArray.length)]
    );
    setHairColor(
      HairColorArray[Math.floor(Math.random() * HairColorArray.length)]
    );
    setFacialHair(
      FacialHairArray[Math.floor(Math.random() * FacialHairArray.length)]
    );
    setFacialHairColor(
      FacialHairColorArray[
        Math.floor(Math.random() * FacialHairColorArray.length)
      ]
    );
    setClothes(ClothesArray[Math.floor(Math.random() * ClothesArray.length)]);
    setFabric(FabricArray[Math.floor(Math.random() * FabricArray.length)]);
    setGraphic(GraphicArray[Math.floor(Math.random() * GraphicArray.length)]);
    setEyes(EyesArray[Math.floor(Math.random() * EyesArray.length)]);
    setEyebrow(EyebrowArray[Math.floor(Math.random() * EyebrowArray.length)]);
    setMouth(MouthArray[Math.floor(Math.random() * MouthArray.length)]);
    setSkin(SkinArray[Math.floor(Math.random() * SkinArray.length)]);
  };

  return (
    <div>
      <div className="avatar-form">
        <div className="avatar-preview">
          <Avatar
            style={{
              width: "20rem",
              height: "20rem",
            }}
            avatarStyle="Circle"
            topType={top}
            accessoriesType={Accessories}
            hairColor={HairColor}
            facialHairType={FacialHair}
            facialHairColor={FacialHairColor}
            clotheType={Clothes}
            clotheColor={Fabric}
            graphicType={Graphic}
            eyeType={Eyes}
            eyebrowType={Eyebrow}
            mouthType={Mouth}
            skinColor={Skin}
          />
        </div>
        <Dropdown
          selected={top}
          setSelected={setTop}
          options={topArray}
          icon="top"
        />
        <Dropdown
          selected={Accessories}
          setSelected={setAccessories}
          options={AccessoriesArray}
          icon="↳ 👓 Accessories"
        />
        <Dropdown
          selected={HairColor}
          setSelected={setHairColor}
          options={HairColorArray}
          icon=" ↳ 💈 Hair Color"
        />
        <Dropdown
          selected={FacialHair}
          setSelected={setFacialHair}
          options={FacialHairArray}
          icon="Facial Hair"
        />
        <Dropdown
          selected={FacialHairColor}
          setSelected={setFacialHairColor}
          options={FacialHairColorArray}
          icon=" ↳ ✂️ Facial Hair Color"
        />
        <Dropdown
          selected={Clothes}
          setSelected={setClothes}
          options={ClothesArray}
          icon=" 👔 Clothes"
        />
        <Dropdown
          selected={Fabric}
          setSelected={setFabric}
          options={FabricArray}
          icon=" ↳ Color Fabric"
        />
        <Dropdown
          selected={Graphic}
          setSelected={setGraphic}
          options={GraphicArray}
          icon="↳ Graphic"
        />
        <Dropdown
          selected={Eyes}
          setSelected={setEyes}
          options={EyesArray}
          icon=" 👁 Eyes"
        />
        <Dropdown
          selected={Eyebrow}
          setSelected={setEyebrow}
          options={EyebrowArray}
          icon=" ✏️ Eyebrow"
        />
        <Dropdown
          selected={Mouth}
          setSelected={setMouth}
          options={MouthArray}
          icon="👄 Mouth"
        />
        <Dropdown
          selected={Skin}
          setSelected={setSkin}
          options={SkinArray}
          icon="🎨 Skin"
        />
      </div>
      <div>
        <button
          onClick={() => {
            getAvatar({
              topType: top,
              accessoriesType: Accessories,
              hairColor: HairColor,
              facialHairType: FacialHair,
              facialHairColor: FacialHairColor,
              clotheType: Clothes,
              clotheColor: Fabric,
              graphicType: Graphic,
              eyeType: Eyes,
              eyebrowType: Eyebrow,
              mouthType: Mouth,
              skinColor: Skin,
            });
          }}
          className="text-btn"
        >
          Done
        </button>
        <button className="filled-btn" onClick={randomAvatar}>
          Random
        </button>
      </div>
    </div>
  );
};

export default AvatarGenrator;
