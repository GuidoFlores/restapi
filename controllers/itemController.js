const admin = require('firebase-admin');
 const db = admin.firestore();

 const jwt = require('jsonwebtoken');

// Clave secreta para verificar el token
const SECRET_KEY = 'shhhhhhhhh';

exports.verifyToken = async (req, res) => {

    /* 
      #swagger.tags = ['Items']
      #swagger.description = 'Get an item by token'
      #swagger.summary = 'Get an item entry by token'
      #swagger.parameters['token'] = {
          description: 'token',
          required: true,
          in: 'header',
          type: 'string'
      }
      #swagger.parameters['id'] = {
          description: 'Item id',
          required: true,
          in: 'path',
          type: 'string'
      }
      
      #swagger.responses[404] = {
          description: 'Item not found',
      }
      #swagger.responses[400] = {
          description: 'Bad request',
      }
      #swagger.responses[408] = {
          description: 'Request Timeout due to invalid token',
      }
      #swagger.responses[200] = {
          description: 'Get an item by id',
      }
    */

    try {
        const itemId = req.params.id;
        // Obtener el token del encabezado de autorización
        const token = req.headers['token'];  // Cambié aquí para usar 'token' en lugar de 'authorization'

        if (!token) {
            return res.status(408).json({ error: 'Token no proporcionado' });
        }

        // Verificar el token
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(408).json({ error: 'Token inválido o expirado' });
            }

            // Token válido, continuar con la obtención del ítem
            
            db.collection('items').doc(itemId).get()
                .then((itemDoc) => {
                    if (!itemDoc.exists) {
                        return res.status(404).json({ error: 'Item no encontrado' });
                    }
                    return res.status(200).json({ id: itemDoc.id, ...itemDoc.data() });
                })
                .catch((error) => {
                    return res.status(400).json({ error: error.message });
                });
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getItem = async (req, res) => {

    /* 
      #swagger.tags = ['Items']
      #swagger.description = 'Get an item entry'
      #swagger.summary = 'Get an item entry'
      #swagger.parameters['id'] = {
          description: 'Item id',
          required: true,
      }
      #swagger.responses[404] = {
          description: 'Item not found',
      }
      #swagger.responses[400] = {
          description: 'Bad request',
      }
      #swagger.responses[200] = {
          description: 'Get an item by id',
      }
    */
  
     try {
         const itemId = req.params.id;
         const itemDoc = await db.collection('items').doc(itemId).get();
         if (!itemDoc.exists) {
             res.status(404).send('Item not found');
         } else {
             res.status(200).json({ id: itemDoc.id, ...itemDoc.data() });
         }
     } catch (error) {
         res.status(400).send(error.message);
     }
  
  };

 exports.getAllItems = async (req, res) => {

  /* 
     #swagger.tags = ['Items']
     #swagger.description = 'Get all items entries'
     #swagger.summary = 'Get all items entries'
     #swagger.responses[200] = {
         description: 'Items entries successfully obtained',
     }
     #swagger.responses[400] = {
         description: 'Bad request',
     }
   */

   try {
     const itemsSnapshot = await db.collection('items').get();
     const items = [];
     itemsSnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
     res.status(200).json(items);
   } catch (error) {
     res.status(400).send(error.message);
   }
 };

 exports.createItem = async (req, res) => {

  /* 
     #swagger.tags = ['Items']
     #swagger.description = 'Create an item'
     #swagger.summary = 'Create an item'
     #swagger.parameters['data'] = {
         in: 'body',
         description: 'Data to create an item',
         required: true,
     }
     #swagger.responses[201] = {
         description: 'Item successfully created',
     }
     #swagger.responses[400] = {
         description: 'Bad request',
     }
   */

   try {
     const data = req.body;
     const itemRef = await db.collection('items').add(data);
     res.status(201).send(`Created a new item: ${itemRef.id}`);
   } catch (error) {
     res.status(400).send(error.message);
   }
 };
 
exports.updateItem = async (req, res) => {

      /* 
           #swagger.tags = ['Items']
           #swagger.description = ''
           #swagger.summary = ''
           #swagger.parameters['id'] = {
               description: '',
               required: true,
           }
           #swagger.parameters['data'] = {
               in: 'body',
               description: '',
               required: true,
           }
           #swagger.responses[200] = {
               description: '',
           }
           #swagger.responses[400] = {
               description: '',
           }
       */

    try {
        const itemId = req.params.id;
        const data = req.body;
        const itemRef = db.collection('items').doc(itemId);
        await itemRef.update(data);
        res.status(200).send('Item updated');
    } catch (error) {
        res.status(400).send(error.message);
    }

};

exports.deleteItem = async (req, res) => {

     /* 
         #swagger.tags = ['Items']
         #swagger.description = ''
         #swagger.summary = ''
         #swagger.parameters['id'] = {
             description: '',
             required: true,
         }

         #swagger.responses[200] = {
             description: '',
         }
         #swagger.responses[400] = {
             description: '',
         }
       */

    try {
        const itemId = req.params.id;
        await db.collection('items').doc(itemId).delete();
        res.status(200).send('Item deleted');
    } catch (error) {
        res.status(400).send(error.message);
    }

};