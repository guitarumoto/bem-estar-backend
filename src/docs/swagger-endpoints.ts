/*
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 example: "senhaSegura123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro ao criar usuário
 *
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 *
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       204:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao atualizar usuário
 *
 * /goals:
 *   post:
 *     summary: Cria uma nova meta
 *     tags: [Metas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - deadline
 *             properties:
 *               title:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Meta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meta'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao criar meta
 *
 *   get:
 *     summary: Lista as metas do usuário autenticado
 *     tags: [Metas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filtrar por status de conclusão
 *     responses:
 *       200:
 *         description: Lista de metas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meta'
 *       401:
 *         description: Não autorizado
 *
 * /goals/{id}:
 *   put:
 *     summary: Atualiza uma meta
 *     tags: [Metas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               completed:
 *                 type: boolean
 *     responses:
 *       204:
 *         description: Meta atualizada com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao atualizar meta
 *
 *   delete:
 *     summary: Deleta uma meta
 *     tags: [Metas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Meta deletada com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao deletar meta
 *
 * /moods:
 *   post:
 *     summary: Registra um novo humor
 *     tags: [Humores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mood
 *             properties:
 *               mood:
 *                 type: integer
 *                 example: 3
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Humor registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Humor'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao registrar humor
 *
 *   get:
 *     summary: Lista os registros de humor do usuário autenticado
 *     tags: [Humores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de humores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Humor'
 *       401:
 *         description: Não autorizado
 *
 * /moods/{id}:
 *   put:
 *     summary: Atualiza um registro de humor
 *     tags: [Humores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mood:
 *                 type: integer
 *                 example: 3
 *               note:
 *                 type: string
 *     responses:
 *       204:
 *         description: Humor atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao atualizar humor
 *
 *  delete:
 *     summary: Deleta um registro de humor
 *     tags: [Humores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Humor deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Permissão negada
 *       500:
 *         description: Erro ao deletar humor
 */
