const db = require("../../data/db-config");

exports.getTarifId = async (tarif_id) => {
  const rows = await db("tarifler as ta")
    .leftJoin("adimlar as ad", "ta.tarif_id", "ad.tarif_id")
    .leftJoin("adimlar_malzemeler as adm", "ad.adim_id", "adm.adim_id")
    .leftJoin("malzemeler as ma", "adm.malzeme_id", "ma.malzeme_id")
    .select(
      "ta.tarif_adi",
      "ta.tarif_id",
      "ta.kayit_tarihi",
      "ad.adim_id",
      "ad.adim_sirasi",
      "ad.adim_talimati",
      "ma.malzeme_id",
      "ma.malzeme_adi",
      "ma.birim",
      "adm.miktar"
    )
    .where("ta.tarif_id", tarif_id);
  const result = {
    tarif_id: rows[0].tarif_id,
    tarif_adi: rows[0].tarif_adi,
    kayit_tarih: rows[0].kayit_tarihi,
    adimlar: [],
  };
  rows.forEach((row) => {
    const adim = {
      adim_sirasi: row.adim_sirasi,
      adim_id: row.adim_id,
      adim_talimati: row.adim_talimati,
      icindekiler: [],
    };
    if (!row.malzeme_adi) {
      result.adimlar.push(adim);
    } else if (!result.adimlar.find((adim) => adim.adim_id === row.adim_id)) {
      adim.icindekiler.push({
        icindekiler_id: row.malzeme_id,
        icindekiler_adi: row.malzeme_adi,
        miktar: row.miktar,
        birim: row.birim,
      });
      result.adimlar.push(adim);
    } else {
      result.adimlar
        .find((adim) => adim.adim_id === row.adim_id)
        .icindekiler.push({
          icindekiler_id: row.malzeme_id,
          icindekiler_adi: row.malzeme_adi,
          miktar: row.miktar,
          birim: row.birim,
        });
    }
  });
  return result;
};
