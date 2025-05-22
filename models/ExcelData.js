const mongoose = require("mongoose");

const ExcelDataSchema = new mongoose.Schema({
  dateAccompagnement:Date ,
  dateCreation:Date,
  commune:String,
  codeCommune:Number,
  codePostal:Number,
  departement:Number,
  region:Number,
  lieuActivite: String,
  typeLieuActivite: String,
  siret:Number,
  canal:String,
  typeActivite:String,
  duree:Number,
  nbParticipants:Number,
  nbParticipantsRecurrents:Number,
  nbPoursuiviIndividuel:Number,
  nbPoursuiviAtelier:Number,
  nbRedirection:Number,
  structuresRedirection:Number,
  statutEmploie:Number,
  statutEtudiant:Number,
  statutRetraite:Number,
  statutSansEmlpoi:Number,
  statutHeterogene:Number,
  ageInf12:Number,
  ageEntre12et17:Number,
  ageEntre18et35:Number,
  ageEntre35et60:Number,
  ageSup60:Number,
  themes:String,
  annotation:String,
  sousThemesInformatique:String,
  sousThemeAccompagner:String,
  sousThemeSante:String,
  sousThemeBureautique:String,
  idInterne:String,




});

module.exports = mongoose.model("ExcelData", ExcelDataSchema);
