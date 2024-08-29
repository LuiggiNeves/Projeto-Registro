<!-- HTML para o Modal de Comentários -->
<div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="commentModalLabel">Comentários do Card</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Seção para a linha do tempo -->
                <div id="timelineContainer" class="timeline-container" style="max-height: 400px; overflow-y: auto; white-space: pre-wrap;">
                </div>
                <div class="mt-4">
                    <label for="commentText" class="form-label">Adicionar Comentário</label>
                    <textarea class="form-control" id="commentText" rows="3"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" id="saveCommentButton">Comentar</button>
            </div>
        </div>
    </div>
</div>

<!-- Inclui o arquivo JavaScript -->
<script src="path/to/comments.js"></script>
