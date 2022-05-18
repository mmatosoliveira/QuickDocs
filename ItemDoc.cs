using System;
using System.Collections.Generic;

namespace QuickDocs
{
    public class ItemDoc
    {
        public string Id { get; set; }

        public string Nome { get; set; }

        public string Categoria { get; set; }

        public string Link { get; set; }

        public string Icone { get; set; }

        public List<string> Tags { get; set; }
    }
}