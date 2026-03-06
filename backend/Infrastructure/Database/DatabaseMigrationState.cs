namespace backend.Infrastructure.Database;

public sealed class DatabaseMigrationState
{
    private readonly object _sync = new();
    private bool _wasAttempted;
    private bool _isHealthy = true;
    private string? _lastError;

    public bool WasAttempted
    {
        get
        {
            lock (_sync)
            {
                return _wasAttempted;
            }
        }
    }

    public bool IsHealthy
    {
        get
        {
            lock (_sync)
            {
                return _isHealthy;
            }
        }
    }

    public string? LastError
    {
        get
        {
            lock (_sync)
            {
                return _lastError;
            }
        }
    }

    public (bool WasAttempted, bool IsHealthy, string? LastError) GetSnapshot()
    {
        lock (_sync)
        {
            return (_wasAttempted, _isHealthy, _lastError);
        }
    }

    public void MarkNotAttempted()
    {
        lock (_sync)
        {
            _wasAttempted = false;
            _isHealthy = true;
            _lastError = null;
        }
    }

    public void MarkHealthy()
    {
        lock (_sync)
        {
            _wasAttempted = true;
            _isHealthy = true;
            _lastError = null;
        }
    }

    public void MarkUnhealthy(Exception exception)
    {
        lock (_sync)
        {
            _wasAttempted = true;
            _isHealthy = false;
            _lastError = exception.Message;
        }
    }
}
