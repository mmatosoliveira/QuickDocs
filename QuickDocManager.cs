using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace QuickDocs
{
    public class QuickDocManager
    {
        private readonly object _lockObject = new();
        private readonly string _path = Path.Combine(Directory.GetCurrentDirectory(), "quickdoc.json");

        public List<ItemDoc> GetDocs()
        {
            lock (_lockObject)
            {
                var json = File.ReadAllText(_path, Encoding.UTF8);
                var dados = JsonConvert.DeserializeObject<List<ItemDoc>>(json);
                return dados;
            }
        }

        public bool SaveDoc(ItemDoc doc)
        {
            var docs = GetDocs();
            lock (_lockObject)
            {
                if (string.IsNullOrWhiteSpace(doc.Id))
                {
                    doc.Id = Guid.NewGuid().ToString();
                    docs.Add(doc);
                }
                else
                {
                    var index = docs.FindIndex(x => x.Id == doc.Id);
                    docs[index] = doc;
                }
                var attJson = JsonConvert.SerializeObject(docs);
                File.WriteAllText(_path, attJson, Encoding.UTF8);
                return true;
            }
        }

        public bool DeleteDoc(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new Exception("O id está vazio/zerado.");

            var docs = GetDocs();
            lock (_lockObject)
            {
                docs = docs.Where(x => x.Id != id).ToList();
                var attJson = JsonConvert.SerializeObject(docs);
                File.WriteAllText(_path, attJson, Encoding.UTF8);
                return true;
            }
        }

        public List<string> ObterTodasCategorias()
        {
            var categorias = GetDocs()
                .GroupBy(x => x.Categoria)
                .Select(x => x.Key)
                .ToList();
            return categorias;
        }
    }
}