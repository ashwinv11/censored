conn = new Mongo();
db = conn.getDB("censored_development");

cursor = db.district.find({DISTRICT: "NADIA"});
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}